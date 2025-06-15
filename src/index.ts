import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import tournamentRoutes from './routes/tournament.routes';
import contestantRoutes from './routes/contestant.routes';
import scoreRoutes from './routes/score.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/contestants', contestantRoutes);
app.use('/api/scores', scoreRoutes);

mongoose.connect(process.env.MONGODB_URI || '', {})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));