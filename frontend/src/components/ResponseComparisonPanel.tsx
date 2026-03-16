import { EvalResult } from '../services/apiClient';

export function ResponseComparisonPanel({ data }: { data: EvalResult[] }) {
  if (!data.length) return null;

  return (
    <div>
      <h2>So sánh phản hồi</h2>
      {data.map((item) => (
        <div key={item.model} style={{ marginBottom: 12 }}>
          <strong>{item.model.toUpperCase()}</strong>
          <p>{item.response}</p>
        </div>
      ))}
    </div>
  );
}
