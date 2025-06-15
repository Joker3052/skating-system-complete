// src/controllers/tournament.controller.ts
import { Request, Response } from 'express';
import Tournament from '../models/Tournament';

export const createTournament = async (req: Request, res: Response) => {
  try {
    const { name, stages } = req.body;
    const tournament = await Tournament.create({ name, stages });
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ message: 'Error creating tournament', error: err });
  }
};

export const getTournaments = async (_req: Request, res: Response) => {
  try {
    const tournaments = await Tournament.find().populate('stages.assignedJudges', 'name email');
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tournaments' });
  }
};

export const assignJudgeToStage = async (req: Request, res: Response) => {
  try {
    const { tournamentId, stageNumber, judgeId } = req.body;
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });

    const stage = tournament.stages.find(s => s.number === stageNumber);
    if (!stage) return res.status(404).json({ message: 'Stage not found' });

    if (!stage.assignedJudges.includes(judgeId)) {
      stage.assignedJudges.push(judgeId);
    }

    await tournament.save();
    res.json({ message: 'Judge assigned', tournament });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning judge', error: err });
  }
};
