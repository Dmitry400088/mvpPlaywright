import { allure } from 'allure-playwright';
import { test, expect } from '../fixtures/projectTemplateFixture';

test.describe('Project template', () => {
  test('should create project template', async ({ page }) => {
    await allure.step('Нажать кнопку один', async () => {});
    await allure.step('Поделить и раздать', async () => {});
  });
});
