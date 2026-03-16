import { EvalResult } from '../services/apiClient';

export function RadarChart({ data }: { data: EvalResult[] }) {
  if (!data.length) return null;

  return (
    <div>
      <h2>RadarChart (placeholder)</h2>
      <p>
        Có thể tích hợp Chart.js sau. Hiện tại đang hiển thị số mô hình: <strong>{data.length}</strong>
      </p>
    </div>
  );
}
