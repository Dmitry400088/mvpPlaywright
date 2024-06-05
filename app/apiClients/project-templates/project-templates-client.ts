import { BrowserContext, expect } from '@playwright/test';
import { ProjectTemplateCreateModel } from '../../models/projectTemplate/projectTemplateCreateModel';

export class ProjectTemplatesClient {
  private context: BrowserContext;
  constructor(context: BrowserContext) {
    this.context = context;
  }

  //**Создать шаблон проекта */
  create = async (model: ProjectTemplateCreateModel): Promise<string> => {
    console.log(`Создать новый шаблон проекта с именем '${model.name}'`);
    const response = await this.context.request.post('/api/project-templates', {
      data: model
    });
    expect(response).toBeOK();

    return (await response.json()) as string;
  };
}
