import { test, expect } from '@playwright/test';
import { createCorpAccount } from '../apiClients/support/supportClient';

test('has title', async ({ page }) => {
  await page.goto('/sign-in');

  const context = page.context();

  await createCorpAccount(context);

  await expect(page).toHaveURL('sign-in');
});
