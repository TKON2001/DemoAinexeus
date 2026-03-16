export interface EvaluationResult {
  model: string;
  response: string;
  latency: number;
  tokens: number;
  cost: number;
  accuracy: number;
}

export interface EvaluateRequest {
  prompt: string;
  models: string[];
  referenceAnswer?: string;
}
