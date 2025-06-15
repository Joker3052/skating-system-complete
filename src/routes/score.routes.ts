import { Router } from 'express';
import { submitScore,getRanking,exportRanking  } from '../controllers/score.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();
router.post('/', verifyToken, submitScore);
router.get('/ranking', verifyToken, getRanking);
router.get('/ranking/export', verifyToken, exportRanking);
export default router;
