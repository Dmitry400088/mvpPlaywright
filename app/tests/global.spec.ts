import {test} from '@playwright/test';

test.afterEach('Status check', async ({ page }) => {

    console.log("Запуск выполнения кода после каждого теста");
    if (test.info().status !== test.info().expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });