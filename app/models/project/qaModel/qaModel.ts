export interface QaModel {
  qaErrorCode: number;
  title: string;
  isCritical: boolean;
  isAlwaysCritical: boolean;
  isEnabled: boolean;
  parameter: string;
}
