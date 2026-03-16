import { randomInt } from 'node:crypto';

const modelStyle: Record<string, string> = {
  gpt: 'GPT',
  gemini: 'Gemini',
  deepseek: 'DeepSeek',
  llama: 'Llama',
};

function simulatedAnswer(model: string, prompt: string): string {
  const prefix = modelStyle[model.toLowerCase()] ?? model;
  return `${prefix} trả lời: ${prompt}. Đây là phản hồi mô phỏng để phục vụ benchmark nội bộ.`;
}

export async function runModel(prompt: string, modelName: string): Promise<string> {
  const delay = randomInt(300, 1300);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return simulatedAnswer(modelName, prompt);
}
