import { Request, Response } from 'express';
import { sequelize, redisClient } from '../config';

export const healthCheck = async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    await redisClient.ping();
    
    res.json({ 
      status: 'OK', 
      database: 'connected',
      redis: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'ERROR', 
      error: 'Service unavailable',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};