import { test, expect } from '@playwright/test';

test('Проверка скриншота в упавшем тесте', async ({ page }) => {
  await page.goto('/');

  console.log('Начало теста с ошибкой');
  expect(1, 'Ошибка для демонстрации скрина в тестах').toEqual(2);
});
