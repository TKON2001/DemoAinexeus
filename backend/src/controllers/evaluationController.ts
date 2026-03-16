import { Request, Response } from 'express';
import { runBenchmark } from '../services/benchmarkEngine.js';

export async function evaluatePrompt(req: Request, res: Response): Promise<void> {
  const { prompt, models, referenceAnswer } = req.body as {
    prompt?: string;
    models?: string[];
    referenceAnswer?: string;
  };

  if (!prompt || !Array.isArray(models) || models.length === 0) {
    res.status(400).json({ error: 'Dữ liệu không hợp lệ. Cần prompt và danh sách models.' });
    return;
  }

  const results = await runBenchmark(prompt, models, referenceAnswer);
  res.json({
    results,
    totalModels: results.length,
  });
}
