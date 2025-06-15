// src/controllers/contestant.controller.ts
import { Request, Response } from 'express';
import Contestant from '../models/Contestant';

export const createContestant = async (req: Request, res: Response) => {
  const { name, tournamentId, stageNumber } = req.body;
  try {
    const contestant = await Contestant.create({ name, tournamentId, stageNumber });
    res.status(201).json(contestant);
  } catch (err) {
    res.status(500).json({ message: 'Error creating contestant', error: err });
  }
};

export const getContestantsByStage = async (req: Request, res: Response) => {
  const { tournamentId, stageNumber } = req.query;
  try {
    const contestants = await Contestant.find({ tournamentId, stageNumber });
    res.json(contestants);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contestants' });
  }
};
