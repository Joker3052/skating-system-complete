// src/routes/tournament.routes.ts
import { Router } from 'express';
import { createTournament, getTournaments, assignJudgeToStage } from '../controllers/tournament.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, createTournament);          // Tạo giải đấu
router.get('/', verifyToken, getTournaments);             // Lấy danh sách
router.post('/assign-judge', verifyToken, assignJudgeToStage); // Gán giám khảo

export default router;
