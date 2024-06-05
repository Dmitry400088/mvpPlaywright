import { BrowserContext, expect } from '@playwright/test';
import { createTranslationMemoryResultModel } from '../../models/tm/createTranslationMemoryResultModel';
import { createTranslationMemoryModel } from '../../models/tm/сreateTranslationMemoryModel';

export class TranslationMemoriesClient {
  private context: BrowserContext;
  constructor(context: BrowserContext) {
    this.context = context;
  }

  //**Создать или обновить TM */
  createOrUpdateTranslationMemory = async (
    model: createTranslationMemoryModel
  ): Promise<createTranslationMemoryResultModel> => {
    console.log(`Создать\\обновить TM`);
    const response = await this.context.request.post(
      '/api/TranslationMemories/Save',
      { data: model }
    );
    await expect(response).toBeOK();

    return (await response.json()) as createTranslationMemoryResultModel;
  };
}
