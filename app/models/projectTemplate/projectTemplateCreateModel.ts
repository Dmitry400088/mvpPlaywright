import { ProjectTemplateBaseModel } from './projectTemplateBaseModel';

export interface ProjectTemplateCreateModel extends ProjectTemplateBaseModel {
  referenceFileIds: string[];
}
