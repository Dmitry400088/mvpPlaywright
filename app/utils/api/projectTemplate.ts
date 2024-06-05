import { ProjectsClient } from '../../apiClients/projects/projectsClient';
import { ProjectTemplateCreateModel } from '../../models/projectTemplate/projectTemplateCreateModel';
import { BrowserContext } from '@playwright/test';
import { QaSettingsModel } from '../../models/projectTemplate/qaSettingsModel';
import { ProjectRepetitionSettingsModel } from '../../models/project/repetitionModel/projectRepetitionSettingsModel';
import { randomString } from '../generator';
import { ProjectClientField } from '../../models/projectTemplate/projectClientField';
import { TranslationMemoryModel } from '../../models/projectTemplate/translationMemoryModel';
import { ProjectSubjectField } from '../../models/projectTemplate/projectSubjectField';
import { language } from '../languages';
import { StageType } from '../../models/stageType';

type params = {
  context: BrowserContext;
  name?: string;
  translationMemory?: TranslationMemoryModel[] | null;
  id?: string;
  sourceLanguages?: number[];
  targetLanguages?: number[];
  workflowStages?: StageType[];
};

export const getProjectTemplateModel = async ({
  context,
  name,
  translationMemory,
  id,
  sourceLanguages,
  targetLanguages,
  workflowStages
}: params): Promise<ProjectTemplateCreateModel> => {
  name = name == undefined ? randomString() : name;
  translationMemory = translationMemory == undefined ? null : translationMemory;
  id = id == undefined ? '' : id;
  sourceLanguages =
    sourceLanguages == undefined ? [language.English] : sourceLanguages;
  targetLanguages =
    targetLanguages == undefined ? [language.Russian] : targetLanguages;
  workflowStages =
    workflowStages == undefined ? [StageType.Translation] : workflowStages;

  const projectClient = new ProjectsClient(context);
  const defaultQa = await projectClient.getDefaultQaModels();
  const qaSettings = defaultQa.map<QaSettingsModel>((qaSetting) => ({
    IsCritical: qaSetting.isAlwaysCritical,
    IsEnabled: qaSetting.isAlwaysCritical,
    QAErrorCode: qaSetting.qaErrorCode,
    Parameter: qaSetting.parameter
  }));
  const repetitionSettings: ProjectRepetitionSettingsModel = {
    caseSensitivityMode: 1,
    confirmChangedSegments: true,
    forbidAutoPropagateRepetitions: false,
    forceAutoPropagateRepetitions: true,
    propagateToConfirmedSegments: true
  };

  const client: ProjectClientField = {
    isActive: false,
    value: null
  };

  const subject: ProjectSubjectField = {
    isActive: false,
    value: null
  };

  return {
    qaSettings: qaSettings,
    repetitionSettings: repetitionSettings,
    name: name,
    client: client,
    referenceFileIds: [],
    customFields: null,
    deadline: null,
    translationMemories: translationMemory,
    description: '',
    glossaries: null,
    id: id,
    subject: subject,
    projectDescription: null,
    isProjectDescriptionAllowed: false,
    isReferenceFilesUploadingAllowed: false,
    machineTranslationPreTranslationRule: null,
    multiAssignmentSettings: null,
    projectNameMask: '',
    sourceLanguages: sourceLanguages,
    targetLanguages: targetLanguages,
    sourcePreTranslateRule: null,
    workflowStages: workflowStages,
    translationMemoryPreTranslateRules: null
  };
};
