import redisClient from '../config/redis.config';
import { IFSCCodeResponse } from '../types';
import { constants } from '../utils/constants';

export class CacheService {
  private client = redisClient;

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async get(key: string): Promise<IFSCCodeResponse | null> {
    try {
      await this.connect();
      const cachedData = await this.client.get(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, data: IFSCCodeResponse): Promise<void> {
    try {
      await this.connect();
      await this.client.setEx(key, constants.CACHE_TTL, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.connect();
      await this.client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}