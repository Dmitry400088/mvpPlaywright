export interface CreateAccountModel {
  isAdmin: boolean;
  accountName: string;
  accountType: number;
  phoneNumber: string;
  country: string;
  isVerified: boolean;
  generateApiKey: boolean;
  shouldRequest3DS: boolean;
  enabledFeatures: string;
  userCreationModel: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createWithVerifiedEmail: boolean;
    uiLanguageId: number;
    country: string;
    isPrivacyPolicyAccepted: boolean;
    showHomePageAndNewLayout: boolean;
  };
}
