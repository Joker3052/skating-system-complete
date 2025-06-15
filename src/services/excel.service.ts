// src/services/excel.service.ts
import ExcelJS from 'exceljs';
import { Response } from 'express';

type RankingRow = {
  contestantName: string;
  total1: number;
  totalPoints: number;
  finalRank: number;
};

export const exportRankingToExcel = async (res: Response, data: RankingRow[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Ranking');

  sheet.columns = [
    { header: 'Rank', key: 'finalRank', width: 10 },
    { header: 'Contestant Name', key: 'contestantName', width: 30 },
    { header: '1st Place Votes', key: 'total1', width: 20 },
    { header: 'Total Score', key: 'totalPoints', width: 15 },
  ];

  sheet.addRows(data);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=ranking.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};
