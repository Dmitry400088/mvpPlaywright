import { BrowserContext, expect } from '@playwright/test';
import { QaModel } from '../../models/project/qaModel/qaModel';

export class ProjectsClient {
  private context: BrowserContext;
  constructor(context: BrowserContext) {
    this.context = context;
  }

  //**Получить дефолтную модель QA для проекта */
  getDefaultQaModels = async (): Promise<QaModel[]> => {
    console.log('Получить дефолтную QA модель для проекта');
    const response = await this.context.request.get(
      `/api/Projects/DefaultQASettings`
    );
    await expect(response).toBeOK();

    return (await response.json()) as QaModel[];
  };
}
