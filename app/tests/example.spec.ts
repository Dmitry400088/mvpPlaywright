import { test, expect } from '@playwright/test';
import { exec } from 'child_process';

test('has title', async ({ page }) => {
  await page.goto('/sign-in');
  
  await expect(page).toHaveURL('sign-in');
});

