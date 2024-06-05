export interface createTranslationMemoryModel {
  name: string;
  sourceLanguageId: number;
  targetLanguageIds: number[];
  description: string;
  clientId: string | null;
  DomainId: number[];
  Specializations: string[];
}
