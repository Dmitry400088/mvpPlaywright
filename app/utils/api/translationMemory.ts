import { createTranslationMemoryModel } from '../../models/tm/сreateTranslationMemoryModel';

export const getTranslationMemory = (
  name: string,
  sourceLanguageId: number,
  targetLanguageIds: number[]
): createTranslationMemoryModel => {
  return {
    name: name,
    sourceLanguageId: sourceLanguageId,
    targetLanguageIds: targetLanguageIds,
    clientId: null,
    Specializations: [],
    description: '',
    DomainId: []
  };
};
