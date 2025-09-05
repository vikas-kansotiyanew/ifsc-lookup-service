import { Router } from 'express';
import ifscRoutes from './ifsc.routes';
import healthRoutes from './health.routes';

const router = Router();

router.use('/ifsc', ifscRoutes);
router.use('/health', healthRoutes);

export default router;