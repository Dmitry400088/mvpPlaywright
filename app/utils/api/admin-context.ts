import { request, APIRequestContext, expect } from '@playwright/test';

const adminUrl = process.env.ADMIN_URL;

//**Получить новый контест для работы в админке, так как админка работает по другому url */
export const getAdminContext = async (): Promise<APIRequestContext> => {
  const context = await request.newContext({
    baseURL: adminUrl,
    ignoreHTTPSErrors: true
  });

  return context;
};
