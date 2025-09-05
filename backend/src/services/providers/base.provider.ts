import { IFSCCodeDetails } from '../../types';

export abstract class BaseProvider {
  abstract fetchIFSCDetails(ifscCode: string): Promise<IFSCCodeDetails>;
  
  protected validateIFSC(ifscCode: string): boolean {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifscCode);
  }
}