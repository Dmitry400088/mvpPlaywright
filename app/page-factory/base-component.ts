import { expect, Locator, Page, test } from '@playwright/test';

export type ComponentProps = {
  page: Page;
  name?: string;
  locator: Locator;
};

export abstract class Component {
  page: Page;
  locator: Locator;
  private name: string | undefined;

  constructor({ page, locator, name }: ComponentProps) {
    this.page = page;
    this.locator = locator;
    this.name = name;
  }

  get componentName(): string {
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"');
    }

    return this.name;
  }

  get typeOf(): string {
    return 'component';
  }

  private getErrorMessage(action: string): string {
    return `The ${this.typeOf} with name "${this.componentName}" and locator ${this.locator} ${action}`;
  }

  async shouldBeVisible(): Promise<void> {
    console.log(`Проверить, что компонент '${this.componentName}' отобразился`);
    await expect(this.locator, {
      message: this.getErrorMessage('is not visible')
    }).toBeVisible();
  }
}
