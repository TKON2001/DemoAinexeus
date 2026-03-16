import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface DatasetItem {
  question: string;
  answer: string;
}

export function loadDataset(name: string): DatasetItem[] {
  const filePath = resolve(process.cwd(), '..', 'datasets', `${name}.json`);
  const data = readFileSync(filePath, 'utf8');
  return JSON.parse(data) as DatasetItem[];
}
