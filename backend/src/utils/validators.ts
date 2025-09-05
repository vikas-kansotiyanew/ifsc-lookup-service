export const isValidIFSC = (ifsc: string): boolean => {
  if (!ifsc) return false;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc.toUpperCase());
};

export const isValidBankCode = (bankCode: string): boolean => {
  return /^[A-Z]{4}$/.test(bankCode);
};

export const isValidMICR = (micr: string): boolean => {
  return /^\d{9}$/.test(micr);
};