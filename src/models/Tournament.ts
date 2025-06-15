import mongoose from 'mongoose';

const StageSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  timeSlot: { type: String, required: true },
  assignedJudges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stages: [StageSchema],
});

export default mongoose.model('Tournament', TournamentSchema);