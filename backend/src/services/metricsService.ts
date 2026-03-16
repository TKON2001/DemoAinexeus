export function measureLatency(startMs: number, endMs: number): number {
  return Number(((endMs - startMs) / 1000).toFixed(3));
}

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

const COST_PER_1K_TOKEN: Record<string, number> = {
  gpt: 0.03,
  gemini: 0.02,
  deepseek: 0.01,
  llama: 0.008,
};

export function estimateCost(model: string, tokens: number): number {
  const rate = COST_PER_1K_TOKEN[model.toLowerCase()] ?? 0.015;
  return Number(((tokens / 1000) * rate).toFixed(6));
}
