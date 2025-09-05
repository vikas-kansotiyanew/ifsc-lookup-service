export interface IFSCCodeDetails {
  MICR?: string;
  BRANCH: string;
  ADDRESS?: string;
  STATE?: string;
  CONTACT?: string;
  UPI: boolean;
  RTGS: boolean;
  CITY?: string;
  CENTRE?: string;
  DISTRICT?: string;
  NEFT: boolean;
  IMPS: boolean;
  SWIFT?: string;
  ISO3166?: string;
  BANK: string;
  BANKCODE: string;
  IFSC: string;
}

export interface IFSCCodeResponse extends IFSCCodeDetails {
  updatedAt?: Date;
  fromCache?: boolean;
  fromDatabase?: boolean;
}