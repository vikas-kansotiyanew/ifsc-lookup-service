import axios from 'axios';
import { IFSCCodeDetails, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const IFSCService = {
  async getIFSCDetails(ifscCode: string): Promise<ApiResponse<IFSCCodeDetails>> {
    try {
      const response = await api.get(`/ifsc/${ifscCode}`);
      return { data: response.data };
    } catch (error: any) {
      if (error.response?.data?.error) {
        return { error: error.response.data.error };
      }
      return { error: 'Failed to fetch IFSC details' };
    }
  }
};