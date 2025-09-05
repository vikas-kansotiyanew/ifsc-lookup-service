import { Request, Response, NextFunction } from 'express';
import { isValidIFSC } from '../utils/validators';

export const validateIFSC = (req: Request, res: Response, next: NextFunction) => {
  const { ifsc } = req.params;

  if (!ifsc || !isValidIFSC(ifsc)) {
    return res.status(400).json({ 
      error: 'Invalid IFSC code format. Must be 11 characters in format: AAAA0XXXXXX' 
    });
  }

  next();
};