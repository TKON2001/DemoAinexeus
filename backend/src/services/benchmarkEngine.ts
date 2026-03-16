import { performance } from 'node:perf_hooks';
import { runModel } from './llmRunner.js';
import { calculateAccuracy } from './scoringService.js';
import { estimateCost, estimateTokens, measureLatency } from './metricsService.js';
import { EvaluationResult } from '../models/resultSchema.js';

export async function runBenchmark(
  prompt: string,
  models: string[],
  referenceAnswer?: string,
): Promise<EvaluationResult[]> {
  const tasks = models.map(async (model): Promise<EvaluationResult> => {
    const start = performance.now();
    const response = await runModel(prompt, model);
    const end = performance.now();
    const tokens = estimateTokens(response);

    return {
      model,
      response,
      latency: measureLatency(start, end),
      tokens,
      cost: estimateCost(model, tokens),
      accuracy: calculateAccuracy(response, referenceAnswer),
    };
  });

  return Promise.all(tasks);
}
