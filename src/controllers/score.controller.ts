// src/controllers/score.controller.ts
import { Request, Response } from 'express';
import Score from '../models/Score';

export const submitScore = async (req: Request, res: Response) => {
  const { contestantId, rank, tournamentId, stageNumber } = req.body;
  const judgeId = (req as any).user.id;

  try {
    const existing = await Score.findOne({ contestantId, judgeId, tournamentId, stageNumber });
    if (existing) {
      existing.rank = rank;
      await existing.save();
      return res.json({ message: 'Score updated', score: existing });
    }

    const score = await Score.create({ contestantId, judgeId, rank, tournamentId, stageNumber });
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting score', error: err });
  }
};

// src/controllers/score.controller.ts (thêm vào dưới cùng)
import { calculateRanking } from '../services/skating.service';

export const getRanking = async (req: Request, res: Response) => {
  const { tournamentId, stageNumber } = req.query;
  if (!tournamentId || !stageNumber) {
    return res.status(400).json({ message: 'Missing tournamentId or stageNumber' });
  }

  try {
    const results = await calculateRanking(tournamentId as string, Number(stageNumber));
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate ranking', error: err });
  }
};

// src/controllers/score.controller.ts (thêm hàm mới)
import { exportRankingToExcel } from '../services/excel.service';
import Contestant from '../models/Contestant';

export const exportRanking = async (req: Request, res: Response) => {
  const { tournamentId, stageNumber } = req.query;
  if (!tournamentId || !stageNumber) {
    return res.status(400).json({ message: 'Missing tournamentId or stageNumber' });
  }

  try {
    const rawRanking = await calculateRanking(tournamentId as string, Number(stageNumber));
    const enriched = await Promise.all(
      rawRanking.map(async r => {
        const contestant = await Contestant.findById(r.contestantId);
        return {
          contestantName: contestant?.name || 'Unknown',
          total1: r.total1,
          totalPoints: r.totalPoints,
          finalRank: r.finalRank,
        };
      })
    );

    await exportRankingToExcel(res, enriched);
  } catch (err) {
    res.status(500).json({ message: 'Failed to export Excel', error: err });
  }
};

