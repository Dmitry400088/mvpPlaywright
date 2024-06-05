import { allure } from 'allure-playwright';
import { test, expect } from '../fixtures/projectTemplateFixture';
import { Teams } from '../utils/teams';
import { getTranslationMemory } from '../utils/api/translationMemory';
import { language } from '../utils/languages';
import { TranslationMemoriesClient } from '../apiClients/translationMemories/translationMemoriesClient';
import { ProjectsClient } from '../apiClients/projects/projectsClient';
import { TranslationMemoryModel } from '../models/projectTemplate/translationMemoryModel';
import { getProjectTemplateModel } from '../utils/api/projectTemplate';
import { ProjectTemplatesClient } from '../apiClients/project-templates/project-templates-client';

test.describe(
  'Project template',
  {
    //можно задать мета информацию для группы тестов

    //можно делать запуск тестов по тегам: npx playwright test --grep @smoke
    //теги можно сделать массивом и комбинировать запуски
    tag: ['@smoke', Teams.swat],
    annotation: [{ type: 'app tests', description: 'тестны на новый UI' }]
  },
  () => {
    test(
      'should create project template',
      {
        //можно задать мета информацию для одного конкретного теста
        annotation: [
          {
            type: 'issue',
            description: 'тут может быть ссылка на бан или таску'
          },
          { type: 'performance', description: 'very slow test!' }
        ]
      },
      async ({ homePage, projectTemplatesPage, page }) => {
        await allure.id('1001');
        await allure.description(
          'Тест проверяет создание нового шаблшона проектов'
        );
        await allure.owner(Teams.swat);
        await allure.feature('Шаблоны');
        await allure.suite('Шаблоны проектов');
        await allure.subSuite('Создание нового шаблона проекта');

        const templateName = 'Best Template';

        //#region Открыть визард создания шаблона со страницы HomePage
        await allure.step(
          'Нажать на карточку Templates and services',
          async () => {
            await homePage.clickTemplatesAndServices();
          }
        );

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
          await projectTemplatesPage.fillTemplateDescription(
            'Описание шаблона'
          );
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
      }
    );

    test(
      'Should change TM in project template',
      {
        annotation: [
          {
            type: 'bug fix',
            description:
              'https://portal.smartcat.ai/youtrack/issue/SUPPORT-4980'
          }
        ]
      },
      async ({ homePage, projectTemplatesPage, page }) => {
        await allure.id('1002');
        await allure.description(
          'Тест проверяет баг, когда при изменении TM в шаблоне проекта данная TM не подключалась на запись'
        );
        await allure.owner(Teams.swat);
        await allure.feature('Шаблоны');
        await allure.suite('Шаблоны проектов');
        await allure.subSuite('Изменение шаблона');

        const templateName = `MyBestTemplate`;
        const tmClient = new TranslationMemoriesClient(page.context());
        const projectTemplateClient = new ProjectTemplatesClient(
          page.context()
        );

        let tm1, tm2;
        await allure.step('Создать две одинаковых TM', async () => {
          const promiseTm1 = tmClient.createOrUpdateTranslationMemory(
            getTranslationMemory(`tm1`, language.English, [language.Russian])
          );
          const promiseTm2 = tmClient.createOrUpdateTranslationMemory(
            getTranslationMemory(`tm2`, language.English, [language.Russian])
          );
          await Promise.all([promiseTm1, promiseTm2]).then((result) => {
            [tm1, tm2] = result;
          });
        });

        await allure.step(
          'Создать шаблон проекта с одной TMкой на запись',
          async () => {
            const translationMemories: TranslationMemoryModel[] = [
              {
                id: tm1.id,
                isWritable: true,
                threshold: 75
              }
            ];

            const templateModel = await getProjectTemplateModel({
              context: page.context(),
              translationMemory: translationMemories,
              name: templateName
            });
            await projectTemplateClient.create(templateModel);
          }
        );

        await allure.step(
          'Обновить страницу HomePage чтобы увидеть созданный шаблон',
          async () => {
            await homePage.reload();
            await homePage.waitForLoad();
          }
        );

        await allure.step(
          'Открыть выпадающий список у созданного шаблона и нажать редактировать',
          async () => {
            await homePage.clickEditTemplate(templateName);
            await homePage.dropdownMenu.selectMenuItem(`Edit project template`);
          }
        );
      }
    );
  }
);
