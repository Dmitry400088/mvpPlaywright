import { createAccountModel } from '../../models/support/createAccountModel';
import { randomString, randomEmail } from '../generator';

export const getSupportAccountModel = (
  accountName?: string,
  enabledFeatures: string = ''
): createAccountModel => {
  accountName = accountName == undefined ? randomString() : accountName;

  return {
    accountName: accountName,
    isAdmin: true,
    accountType: 2,
    phoneNumber: '893628System.Random',
    country: 'RUS',
    isVerified: true,
    generateApiKey: false,
    shouldRequest3DS: false,
    enabledFeatures: enabledFeatures,
    userCreationModel: {
      firstName: 'Loverute',
      lastName: 'Loverutezhae',
      email: randomEmail(),
      password: 'passwordEMa6WuPtESPuhDm6FWdiw',
      createWithVerifiedEmail: true,
      uiLanguageId: 9,
      country: 'RUS',
      isPrivacyPolicyAccepted: true,
      showHomePageAndNewLayout: true
    }
  };
};
