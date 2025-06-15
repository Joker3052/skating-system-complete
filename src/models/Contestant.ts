import mongoose from 'mongoose';

const ContestantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  stageNumber: { type: Number, required: true },
});

export default mongoose.model('Contestant', ContestantSchema);