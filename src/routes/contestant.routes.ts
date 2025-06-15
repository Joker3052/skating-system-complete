import { Router } from 'express';
import { createContestant, getContestantsByStage } from '../controllers/contestant.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();
router.post('/', verifyToken, createContestant);
router.get('/', verifyToken, getContestantsByStage);

export default router;
