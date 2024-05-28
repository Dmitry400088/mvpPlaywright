import { getSupportAccountModel } from '../../utils/api/support';
import { BrowserContext, expect } from '@playwright/test';
import { createCorpAccountResultModel } from '../../models/support/createCorpAccountResultModel';

const url: string = '/api/testsupport/users/corporate';
const supportAuth = `Basic ${btoa('SeleniumTestApiUser:123456')}`;

export const createCorpAccount = async (
  context: BrowserContext,
  accountName?: string
): Promise<createCorpAccountResultModel> => {
  console.log('Зарегистрировать корп.аккаунт');

  const accountModel = getSupportAccountModel(accountName);
  const response = await context.request.post(url, {
    data: accountModel,
    headers: { Authorization: supportAuth }
  });

  await expect(response).toBeOK();

  let result = (await response.json()) as createCorpAccountResultModel;
  result.Email = accountModel.userCreationModel.email;
  result.Password = accountModel.userCreationModel.password;

  console.log(
    `Зарегистрирован пользователь корп.аккаунта ${result.Email}/${result.Password}`
  );

  return result;
};
