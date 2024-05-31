import { allure } from 'allure-playwright';
import { test, expect } from '../fixtures/projectTemplateFixture';

test.describe('Project template', () => {
  test('should create project template', async ({
    homePage,
    projectTemplatesPage,
    page
  }) => {
    const templateName = 'Best Template';

    //#region Открыть визард создания шаблона со страницы HomePage
    await allure.step('Нажать на карточку Templates and services', async () => {
      await homePage.clickTemplatesAndServices();
    });

    await allure.step(
      'В меню выбрать Create template и нажать создать шаблон',
      async () => {
        await homePage.clickCreateTemplate();
        await homePage.clickCreateProjectTemplate();
      }
    );
    //#endregion

    //#region Заполнить форму создания шаблона проектов
    await allure.step(`Ввести имя и описание шаблона проекта`, async () => {
      await projectTemplatesPage.fillName(templateName);
      await projectTemplatesPage.fillTemplateDescription('Описание шаблона');
      await projectTemplatesPage.clickSetWorkflowButton();
    });

    await allure.step(`Ввести WF и языки`, async () => {
      await projectTemplatesPage.openSourcelanguageDrpdown();
      await projectTemplatesPage.clickByLanguage(`English`);

      await projectTemplatesPage.openTargetlanguageDrpdown();
      await projectTemplatesPage.clickByLanguage(`Russian`);
      await projectTemplatesPage.clickSetProjectPropertiesButton();
    });

    await allure.step(`Заполнить свойства проекта`, async () => {
      await projectTemplatesPage.clickSetupLinguisticAssetsButton();
    });

    await allure.step(`Настроить лингвистические ресурсы`, async () => {
      await projectTemplatesPage.clickSetLinguisticAssetsRulesButton();
    });

    await allure.step(
      `Настроить правила предварительного перевода`,
      async () => {
        await projectTemplatesPage.clickConfigureAssignmentsButton();
      }
    );

    await allure.step(`Настроить конфигурацию назначений`, async () => {
      await projectTemplatesPage.clickSkipAutoAssign();
      await projectTemplatesPage.clickUploadReferenceFilesButton();
    });

    await allure.step(`Настроить справочные файлы`, async () => {
      await projectTemplatesPage.clickSetAdvancedProjectSettingsButton();
    });

    await allure.step(`Настроить повторы и QA проверки`, async () => {
      await projectTemplatesPage.clickCreateProjectTemplateButton();
    });

    //#endregion

    await allure.step(
      'ER: созданный шаблон отобразился на странице HomePage',
      async () => {
        await expect(
          homePage.shortcutCard,
          'Шаблон не отобразился на страницу HomePage'
        ).toContainText([templateName]);
      }
    );
  });
});
