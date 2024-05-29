import { BasePage } from '../base-page';
import { Page, type Locator, expect } from '@playwright/test';

export class HomePage extends BasePage {
  //#region Локаторы
  readonly isPageOpened: Locator;
  //#endregion

  constructor(public page: Page) {
    super(page);

    //#region инициализация локаторов
    this.isPageOpened = page.locator(`//div[@data-page-name='Home']`);
    //#endregion
  }

  //**Ждать что страница загружена */
  waitForLoad = async () => {
    await expect(
      this.isPageOpened,
      `Не загрузилась страница HomePage`
    ).toBeVisible();
  };

  //**Открыть страницу */
  getPage = async (): Promise<void> => {
    await this.visit(`/`);
  };
}
