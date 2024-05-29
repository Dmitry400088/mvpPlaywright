import { request, APIRequestContext, expect } from '@playwright/test';
import { SubscriptionPlanModel } from '../../models/admin/subscription-model';

export class AdminClient {
  constructor(public context: APIRequestContext) {}

  //**Логин в админку */
  login = async (email: string, password: string): Promise<void> => {
    console.log(
      `Выполнить вход в админку: под пользователем ${email}/${password}`
    );

    const response = await this.context.post('/Home/LoginJson', {
      data: { email, password }
    });

    await expect(response, 'Не удалось').toBeOK();
  };

  //**Получить список доступных подписок */
  getSubscriptionPlan = async(accountId:string):Promise<SubscriptionPlanModel[]>=>{
    const url=`/api/enterpriseAccount/subscriptions/subscriptionPlans?accountId=${accountId}`
    const response = await this.context.get(url);
    await expect(response,'Не удалось получить достпуные подписки').toBeOK();
  
    return await response.json() as SubscriptionPlanModel[];
  }

  //**Установить подписку аккаунту */
  setSetSubscriptionPlan = async(accountId: string, subscriptionPlanId: string):Promise<void>=>{
    console.log(`Установить аккаунту ${accountId} подписку`);
    const url = `/api/enterpriseAccount/subscriptions?accountId=${accountId}`;
    const response= await this.context.post(url, {
        data:{
            startDate:new Date(),
            subscriptionPlanId: subscriptionPlanId,
           
        }
    });

    await expect(response,'Не удалось включить подписку').toBeOK();

  }
}
