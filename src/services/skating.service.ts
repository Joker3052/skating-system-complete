// src/services/skating.service.ts
import Score from '../models/Score';
import Contestant from '../models/Contestant';
import User from '../models/User';

type RankedResult = {
  contestantId: string;
  total1: number;
  ranks: number[];
  finalRank?: number;
};

// export const calculateRanking = async (tournamentId: string, stageNumber: number) => {
//   const scores = await Score.find({ tournamentId, stageNumber });
//   const contestants = await Contestant.find({ tournamentId, stageNumber });
//   const judges = await User.find({ _id: { $in: scores.map(s => s.judgeId) } });

//   const contestantMap: Record<string, RankedResult> = {};

//   for (const c of contestants) {
//     contestantMap[c._id.toString()] = {
//       contestantId: c._id.toString(),
//       total1: 0,
//       ranks: Array(judges.length).fill(0),
//     };
//   }

//   scores.forEach(score => {
//     const cId = score.contestantId.toString();
//     if (!contestantMap[cId]) return;
//     contestantMap[cId].ranks[score.rank - 1] += 1;
//     if (score.rank === 1) contestantMap[cId].total1 += 1;
//   });

//   const ranking = Object.values(contestantMap)
//     .sort((a, b) => {
//       // 1. So sánh ai được nhiều số 1 hơn
//       if (b.total1 !== a.total1) return b.total1 - a.total1;

//       // 2. Tổng ưu tiên (số lần được xếp hạng cao)
//       const sumA = a.ranks.reduce((s, v, i) => s + v * (i + 1), 0);
//       const sumB = b.ranks.reduce((s, v, i) => s + v * (i + 1), 0);
//       return sumA - sumB;
//     })
//     .map((c, i) => ({ ...c, finalRank: i + 1 }));

//   return ranking;
// };


// src/services/skating.service.ts (chỉnh hàm `calculateRanking`)
export const calculateRanking = async (tournamentId: string, stageNumber: number) => {
  const scores = await Score.find({ tournamentId, stageNumber });
  const contestants = await Contestant.find({ tournamentId, stageNumber });

  const contestantMap: Record<string, RankedResult> = {};

  for (const c of contestants) {
    contestantMap[c._id.toString()] = {
      contestantId: c._id.toString(),
      total1: 0,
      ranks: [],
    };
  }

  scores.forEach(score => {
    const cId = score.contestantId.toString();
    if (!contestantMap[cId]) return;
    contestantMap[cId].ranks.push(score.rank);
    if (score.rank === 1) contestantMap[cId].total1 += 1;
  });

  const ranking = Object.values(contestantMap)
    .map(c => {
      const totalPoints = c.ranks.reduce((sum, val) => sum + val, 0);
      return { ...c, totalPoints };
    })
    .sort((a, b) => {
      if (b.total1 !== a.total1) return b.total1 - a.total1;
      return a.totalPoints - b.totalPoints;
    })
    .map((c, i) => ({ ...c, finalRank: i + 1 }));

  return ranking;
};
