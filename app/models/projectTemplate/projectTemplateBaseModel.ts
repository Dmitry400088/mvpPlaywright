import { ProjectClientField } from './projectClientField';
import { QaSettingsModel } from './qaSettingsModel';
import { ProjectRepetitionSettingsModel } from '../project/repetitionModel/projectRepetitionSettingsModel';
import { ProjectSubjectField } from './projectSubjectField';
import { TranslationMemoryModel } from './translationMemoryModel';
import { StageType } from '../stageType';

export interface ProjectTemplateBaseModel {
  client: ProjectClientField;
  customFields: object | null;
  deadline: string | null;
  description: string;
  glossaries: object | null;
  id: string;
  isProjectDescriptionAllowed: boolean;
  isReferenceFilesUploadingAllowed: boolean;
  machineTranslationPreTranslationRule: object | null;
  multiAssignmentSettings: object | null;
  name: string;
  projectDescription: string | null;
  projectNameMask: string;
  qaSettings: QaSettingsModel[];
  repetitionSettings: ProjectRepetitionSettingsModel;
  sourceLanguages: number[];
  sourcePreTranslateRule: Object | null;
  subject: ProjectSubjectField;
  targetLanguages: number[];
  translationMemories: TranslationMemoryModel[] | null;
  translationMemoryPreTranslateRules: object | null;
  workflowStages: StageType[];
}
