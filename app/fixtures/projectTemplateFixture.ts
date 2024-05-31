import { test as base, expect } from '@playwright/test';
import { createCorpAccount } from '../apiClients/support/supportClient';
import { AuthClient } from '../apiClients/auth/authClient';
import { allure } from 'allure-playwright';
import { CreateCorpAccountResultModel } from '../models/support/createCorpAccountResultModel';
import { HomePage } from '../Pages/HomePage/home-page';
import { AdminClient } from '../apiClients/admin/admin-client';
import { getAdminContext } from '../utils/api/admin-context';
import { ProjectTemplatesPage } from '../Pages/ProjectTemplatesPage/project-templates';

type TestPages = {
  homePage: HomePage;
  projectTemplatesPage: ProjectTemplatesPage;
};

//фикстура тестов для project template
//создаем аккаунт с соответствующими фичами, подпиской, открываем страницу HomePage
export const test = base.extend<TestPages>({
  //#region настройки homePage
  homePage: async ({ page }, use) => {
    let lsp;
    const context = page.context();
    const authClient = new AuthClient(context);
    const homePage = new HomePage(page);
    const adminClient = new AdminClient(await getAdminContext());

    await allure.step(
      'Зарегистрировать LSP с фичефлагами для project template',
      async () => {
        const features =
          'HasProjectTemplates, OrderManagementEnabled, UseImprovedGlossaryTermsMarkupAlgorithm';
        lsp = await createCorpAccount(page.context(), undefined, features);
      }
    );

    await allure.step('Включить аккаунту Enterprise подписку', async () => {
      await adminClient.login(lsp.Email, <string>lsp.Password);
      const avalibleSubscription = await adminClient.getSubscriptionPlan(
        lsp.CorporateAccountId
      );
      const enterprise = avalibleSubscription.filter(
        (c) => c.name == 'Enterprise' && c.archivedDate == null
      );
      await adminClient.setSetSubscriptionPlan(
        lsp.CorporateAccountId,
        enterprise[0].id
      );
    });

    await allure.step(
      'Ввполнить вход в аккаунт и открыть страницу HomePage',
      async () => {
        await authClient.signInUser(<string>lsp.Email, <string>lsp.Password);
        await authClient.loginToAccount(lsp.CorporateAccountId);
        await homePage.getPage();
      }
    );
    use(homePage);
  },
  //#endregion

  //#region настройки projectTemplatesPage
  projectTemplatesPage: async ({ page }, use) => {
    use(new ProjectTemplatesPage(page));
  }
  //#endregion
});

export { expect };
