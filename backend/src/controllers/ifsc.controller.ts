import { Request, Response } from 'express';
import { IFSCService } from '../services/ifsc.service';

const ifscService = new IFSCService();

export const getIFSCDetails = async (req: Request, res: Response) => {
  try {
    const { ifsc } = req.params;

    if (!ifsc || typeof ifsc !== 'string') {
      return res.status(400).json({ error: 'IFSC code is required' });
    }

    const details = await ifscService.getIFSCDetails(ifsc.toUpperCase());
    
    res.json(details);
  } catch (error: any) {
    if (error.message === 'Invalid IFSC code format') {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === 'IFSC code not found') {
      return res.status(404).json({ error: error.message });
    }
    
    console.error('Error fetching IFSC details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};