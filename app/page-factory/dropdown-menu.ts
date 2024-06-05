import { expect, Locator } from '@playwright/test';
import { Component, ComponentProps } from './base-component';

export class DropdownMenu extends Component {
  readonly items: Locator;

  constructor({ page, locator, name }: ComponentProps) {
    super({ page, locator, name });

    this.items = this.page.getByTestId('dropdown-line');
  }

  get typeOf(): string {
    return 'dropdown menu';
  }

  selectMenuItem = async (itemName: string): Promise<void> => {
    await this.shouldBeVisible();
    console.log(`В выпадающем меню выбрать ${itemName}`);
    const item = this.items.filter({ hasText: itemName });
    expect(item, `${itemName} не найден`).toHaveCount(1);

    await item.click();
  };
}
