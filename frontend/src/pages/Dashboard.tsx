import { useState } from 'react';
import { evaluatePrompt, EvalResult } from '../services/apiClient';
import { PromptInput } from '../components/PromptInput';
import { ModelSelector } from '../components/ModelSelector';
import { MetricsPanel } from '../components/MetricsPanel';
import { ResultTable } from '../components/ResultTable';
import { ResponseComparisonPanel } from '../components/ResponseComparisonPanel';
import { RadarChart } from '../components/RadarChart';

export function Dashboard() {
  const [models, setModels] = useState<string[]>(['gpt', 'gemini']);
  const [results, setResults] = useState<EvalResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runEvaluation = async (prompt: string, referenceAnswer?: string) => {
    setLoading(true);
    setError('');

    try {
      const data = await evaluatePrompt(prompt, models, referenceAnswer);
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>AI Nexus Evaluation Platform</h1>
      <ModelSelector selected={models} onChange={setModels} />
      <PromptInput onSubmit={runEvaluation} loading={loading} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MetricsPanel data={results} />
      <ResultTable data={results} />
      <ResponseComparisonPanel data={results} />
      <RadarChart data={results} />
    </main>
  );
}
