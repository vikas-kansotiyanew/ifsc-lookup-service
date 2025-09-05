import IFSC from '../models/ifsc.model';
import { IFSCCodeDetails } from '../types';

export class IFSCRepository {
  async findByIFSC(ifscCode: string): Promise<IFSC | null> {
    return IFSC.findOne({ where: { ifsc: ifscCode } });
  }

  async createOrUpdate(ifscCode: string, data: IFSCCodeDetails): Promise<IFSC> {
    const [record, created] = await IFSC.upsert({
      ifsc: ifscCode,
      bank: data.BANK,
      branch: data.BRANCH,
      address: data.ADDRESS || null,
      city: data.CITY || null,
      district: data.DISTRICT || null,
      state: data.STATE || null,
      bankCode: data.BANKCODE || null,
      center: data.CENTRE || null,
      contact: data.CONTACT || null,
      micr: data.MICR || null,
      upi: data.UPI,
      rtgs: data.RTGS,
      neft: data.NEFT,
      imps: data.IMPS,
      swift: data.SWIFT || null,
      iso3166: data.ISO3166 || null
    });

    return record;
  }

  async isDataFresh(ifscCode: string, freshnessDays: number): Promise<boolean> {
    const record = await this.findByIFSC(ifscCode);
    if (!record) return false;

    const freshDate = new Date();
    freshDate.setDate(freshDate.getDate() - freshnessDays);

    return record.updatedAt >= freshDate;
  }
}