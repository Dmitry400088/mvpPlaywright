import { BasePage } from '../base-page';
import { Page, type Locator, expect } from '@playwright/test';
import { ProjectTemplatesPage } from '../ProjectTemplatesPage/project-templates';
import { DropdownMenu } from '../../page-factory/dropdown-menu';

export class HomePage extends BasePage {
  //#region объявление локаторов
  readonly pageName: Locator;
  readonly templatesAndServicesCard: Locator;
  readonly shortcutsDropdownMenu: Locator;
  readonly createProjectTemplate: Locator;
  readonly shortcutCard: Locator;
  //#endregion

  //#region  Обявление компонентов
  readonly dropdownMenu: DropdownMenu;
  //#endregion

  constructor(public page: Page) {
    super(page);

    //#region инициализация локаторов
    this.pageName = page.locator(`//div[@data-page-name='Home']`);
    this.templatesAndServicesCard = page.getByTestId('add-shortcut');
    this.shortcutsDropdownMenu = page.getByTestId('dropdown-line');
    this.createProjectTemplate = page.getByTestId('create-project-template');
    this.shortcutCard = page.locator(`//*[@data-testid='shortcuts']//a`);
    //#endregion

    //#region инициализация компонентов
    this.dropdownMenu = new DropdownMenu({
      page: page,
      locator: page.getByTestId('dropdown-container'),
      name: 'Контейнер для выпадающего меню Shortcuts'
    });
    //#endregion
  }

  //**Нажать кнопку редактирования шаблона */
  clickEditTemplate = async (templateName: string) => {
    console.log(`Нажать кнопку редактирования шаблона "${templateName}"`);
    const card = this.shortcutCard.filter({ hasText: templateName });
    await expect(
      card,
      `На странице HomePage не отобразился шаблон с именем ${templateName}`
    ).toHaveCount(1);

    await card.getByRole('button').click();
  };

  //**Нажать кнопку Create template в выпадающем меню Shortcuts */
  clickCreateTemplate = async () => {
    console.log('Нажать на кнопку Create template');

    await this.shortcutsDropdownMenu
      .filter({ hasText: 'Create template' })
      .click();
  };

  //**Нажать кнопку создать шаблон проекта */
  clickCreateProjectTemplate = async () => {
    console.log(`Нажать кнопку Create Project template`);
    await this.createProjectTemplate.click();

    await new ProjectTemplatesPage(this.page).waitForLoad();
  };

  //**Нажать на карточку Templates and services*/
  clickTemplatesAndServices = async () => {
    console.log(
      `Нажать на карточку Templates and services из раздела Shortcuts`
    );
    await this.templatesAndServicesCard.click();
  };

  //**Ждать что страница загружена */
  waitForLoad = async () => {
    console.log(`Ждать загрузку страницу HomePage`);
    await expect(
      this.pageName,
      `Не загрузилась страница HomePage`
    ).toBeVisible();
  };

  //**Открыть страницу */
  getPage = async (): Promise<void> => {
    console.log(`Открыть страницу HomePage`);
    await this.visit(`/`);
  };
}
