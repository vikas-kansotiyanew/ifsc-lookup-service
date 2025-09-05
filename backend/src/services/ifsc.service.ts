import { IFSCRepository } from '../repositories/ifsc.repository';
import { CacheService } from './cache.service';
import { ProviderFactory } from './providers/provider.factory';
import { IFSCCodeResponse, IFSCCodeDetails } from '../types';
import { constants } from '../utils/constants';
import IFSC from '../models/ifsc.model'; // Add this import

export class IFSCService {
  private repository = new IFSCRepository();
  private cache = new CacheService();
  private provider = ProviderFactory.getProvider();

  async getIFSCDetails(ifscCode: string): Promise<IFSCCodeResponse> {
    const cacheKey = `ifsc:${ifscCode}`;

    const cachedData = await this.cache.get(cacheKey);
    if (cachedData) {
      return { ...cachedData, fromCache: true };
    }

    const isFresh = await this.repository.isDataFresh(ifscCode, constants.FRESHNESS_DAYS);
    let ifscDetails: IFSCCodeDetails;

    if (isFresh) {
      const dbRecord = await this.repository.findByIFSC(ifscCode);
      ifscDetails = this.mapDBToResponse(dbRecord!);
    } else {
      ifscDetails = await this.provider.fetchIFSCDetails(ifscCode);
      await this.repository.createOrUpdate(ifscCode, ifscDetails);
    }

    const response: IFSCCodeResponse = {
      ...ifscDetails,
      fromDatabase: isFresh,
      fromCache: false
    };

    await this.cache.set(cacheKey, response);

    return response;
  }

  private mapDBToResponse(dbRecord: IFSC): IFSCCodeDetails { // Change parameter type to IFSC
    return {
      MICR: dbRecord.micr || undefined,
      BRANCH: dbRecord.branch,
      ADDRESS: dbRecord.address || undefined,
      STATE: dbRecord.state || undefined,
      CONTACT: dbRecord.contact || undefined,
      UPI: dbRecord.upi || false,
      RTGS: dbRecord.rtgs || false,
      CITY: dbRecord.city || undefined,
      CENTRE: dbRecord.center || undefined,
      DISTRICT: dbRecord.district || undefined,
      NEFT: dbRecord.neft || false,
      IMPS: dbRecord.imps || false,
      SWIFT: dbRecord.swift || undefined,
      ISO3166: dbRecord.iso3166 || undefined,
      BANK: dbRecord.bank,
      BANKCODE: dbRecord.bankCode || '',
      IFSC: dbRecord.ifsc
    };
  }
}