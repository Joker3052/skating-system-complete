import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  contestantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contestant', required: true },
  judgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  stageNumber: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Score', ScoreSchema);