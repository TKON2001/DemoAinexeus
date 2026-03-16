export interface EvalResult {
  model: string;
  response: string;
  latency: number;
  tokens: number;
  cost: number;
  accuracy: number;
}

export async function evaluatePrompt(prompt: string, models: string[], referenceAnswer?: string) {
  const res = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, models, referenceAnswer }),
  });

  if (!res.ok) {
    throw new Error('Không thể chạy đánh giá');
  }

  return (await res.json()) as { results: EvalResult[]; totalModels: number };
}
