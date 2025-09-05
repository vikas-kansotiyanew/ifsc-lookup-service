import axios from 'axios';
import { BaseProvider } from './base.provider';
import { IFSCCodeDetails } from '../../types';
import { constants } from '../../utils/constants';

export class RazorpayProvider extends BaseProvider {
  async fetchIFSCDetails(ifscCode: string): Promise<IFSCCodeDetails> {
    if (!this.validateIFSC(ifscCode)) {
      throw new Error('Invalid IFSC code format');
    }

    try {
      const response = await axios.get(`${constants.EXTERNAL_API_BASE_URL}/${ifscCode}`, {
        timeout: 5000
      });
      
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('IFSC code not found');
      }
      throw new Error(`Failed to fetch IFSC details: ${error.message}`);
    }
  }
}