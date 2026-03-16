import { EvalResult } from '../services/apiClient';

export function MetricsPanel({ data }: { data: EvalResult[] }) {
  if (!data.length) return null;
  const avgLatency = data.reduce((acc, item) => acc + item.latency, 0) / data.length;
  const avgAccuracy = data.reduce((acc, item) => acc + item.accuracy, 0) / data.length;

  return (
    <div>
      <h2>Chỉ số tổng quan</h2>
      <p>Thời gian phản hồi trung bình: {avgLatency.toFixed(2)}s</p>
      <p>Độ chính xác trung bình: {(avgAccuracy * 100).toFixed(1)}%</p>
    </div>
  );
}
