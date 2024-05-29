import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  /**Открыть URL */
  visit = async (url: string): Promise<void> => {
    console.log(`Открыть url: ${url}`);
    await this.page.goto(url);
    await this.page.waitForURL(url);
  };

  /**Обновить страницу */
  reload = async (): Promise<void> => {
    const curentUrl = this.page.url();
    console.log(`Перезагрузить страницу ${curentUrl}`);
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  };
}
