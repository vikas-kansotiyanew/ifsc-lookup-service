import { Router } from 'express';
import { getIFSCDetails } from '../controllers/ifsc.controller';
import { validateIFSC } from '../middlewares/validation.middleware';

const router = Router();

router.get('/:ifsc', validateIFSC, getIFSCDetails);

export default router;