import { BasePage } from '../base-page';
import { Page, type Locator, expect } from '@playwright/test';

export class ProjectTemplatesPage extends BasePage {
  //#region инициализация локаторов
  readonly pageName: Locator;
  readonly templateName: Locator;
  readonly templateDescription: Locator;
  readonly nextStepButton: Locator;
  readonly languageMenu: Locator;
  readonly languageItem: Locator;
  readonly tooltipActivator: Locator;
  readonly assignmentSkip: Locator;
  //#endregion

  constructor(public page: Page) {
    super(page);

    //#region инициализация локаторов
    this.pageName = page.locator(`//div[@data-page-name='ProjectTemplates']`);
    this.templateName = page.getByTestId(`template-name`);
    this.templateDescription = page.getByTestId(`template-description`);
    this.nextStepButton = page.getByTestId(`next-step-button`);
    this.languageMenu = page.getByTestId(`multiselect-activator`);
    this.languageItem = page.getByTestId(`label`);
    this.tooltipActivator = page.getByTestId(`tooltip-activator`);
    this.assignmentSkip = page.getByTestId(`assignment-source-skip`);
    //#endregion
  }

  //**Нажать кнопку пропуска авто-назначений */
  clickSkipAutoAssign = async () => {
    console.log(`Нажать кнопку пропуска авто-назначений`);
    await this.assignmentSkip.click();
  };

  //**Выбрать язык из списка */
  clickByLanguage = async (language: string) => {
    console.log(`Выбрать язык: '${language}'`);
    await this.languageItem.getByText(language, { exact: true }).click();
    await this.page.keyboard.press(`Escape`);
  };

  //**Открыть выпадающий список исходных языков */
  openSourcelanguageDrpdown = async () => {
    console.log(`Открыть выпадающий список исходных языков`);
    await this.languageMenu.getByText('Choose source language').click();
  };

  //**Открыть выпадающий список таргет языков */
  openTargetlanguageDrpdown = async () => {
    console.log(`Открыть выпадающий список исходных языков`);
    await this.languageMenu.getByText('Choose target language').click();
  };

  //**Ввести описание шаблона */
  fillTemplateDescription = async (text: string) => {
    console.log(`Ввести описание шаблона: '${text}'`);
    await this.templateDescription.fill(text);
  };

  clickSetWorkflowButton = async () => {
    console.log(`Нажать кнопку Set workflow`);
    await this.nextStepButton.getByText('Set workflow').click();
  };

  clickSetProjectPropertiesButton = async () => {
    console.log(`Нажать кнопку Set project properties`);
    await this.tooltipActivator
      .getByText('Set project properties')
      .waitFor({ state: 'visible' });
    await this.tooltipActivator.getByText('Set project properties').click();
  };

  clickSetupLinguisticAssetsButton = async () => {
    console.log(`Нажать кнопку 'Set up linguistic assets'`);
    await this.page.getByText('Set up linguistic assets').click();
  };

  clickSetLinguisticAssetsRulesButton = async () => {
    console.log(`Нажать кнопку 'Set linguistic asset rules'`);
    await this.page.getByText('Set linguistic asset rules').click();
  };

  clickConfigureAssignmentsButton = async () => {
    console.log(`Нажать кнопку 'Configure assignments'`);
    await this.page.getByText('Configure assignments').click();
  };

  //**Нажать кнопку 'Upload reference files' */
  clickUploadReferenceFilesButton = async () => {
    console.log(`Нажать кнопку 'Upload reference files'`);
    await this.page.getByText('Upload reference files').click();
  };

  //**Нажать кнопку 'Set advanced project settings' */
  clickSetAdvancedProjectSettingsButton = async () => {
    console.log(`Нажать кнопку 'Set advanced project settings'`);
    await this.page.getByText('Set advanced project settings').click();
  };

  //**Нажать кнопку 'Create a project template' */
  clickCreateProjectTemplateButton = async () => {
    console.log(`Нажать кнопку 'Create a project template'`);
    await this.page
      .getByRole('button')
      .getByText('Create a project template')
      .click();
  };

  //**Ввести имя проекта */
  fillName = async (templateName: string) => {
    console.log(`Ввести имя проекта '${templateName}'`);
    await this.templateName.fill(templateName);
  };

  //**Ждать что страница загружена */
  waitForLoad = async () => {
    await expect(
      this.pageName,
      `Не загрузилась страница ProjectTemplates`
    ).toBeVisible();
  };
}
