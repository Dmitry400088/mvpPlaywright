import { BrowserContext, expect } from '@playwright/test';
import { SignInUserModel } from '../../models/auth/signInUserModel';

export class AuthClient {
  private context: BrowserContext;
  constructor(context: BrowserContext) {
    this.context = context;
  }

  /**Авторизоваться */
  signInUser = async (email: string, password: string): Promise<void> => {
    const model: SignInUserModel = {
      email: email,
      password: password
    };
    console.log(`Выполнить вход под пользователем ${email}/${password}`);
    const response = await this.context.request.post('/api/auth/signInUser', {
      data: model
    });
    await expect(response).toBeOK();
  };

  /**Выполнить вход в аккаунт */
  loginToAccount = async (accountId: string): Promise<void> => {
    console.log(`Выполнить вход в аккаунт ${accountId}`);
    const url = `/api/auth/loginToAccount?accountId=${accountId}`;
    const response = await this.context.request.get(url);
    await expect(response).toBeOK();
  };
}
