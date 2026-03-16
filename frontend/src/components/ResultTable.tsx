import { EvalResult } from '../services/apiClient';

export function ResultTable({ data }: { data: EvalResult[] }) {
  if (!data.length) return null;

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Mô hình</th>
          <th>Thời gian phản hồi</th>
          <th>Số token</th>
          <th>Chi phí</th>
          <th>Độ chính xác</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.model}>
            <td>{r.model.toUpperCase()}</td>
            <td>{r.latency.toFixed(2)}s</td>
            <td>{r.tokens}</td>
            <td>${r.cost.toFixed(4)}</td>
            <td>{(r.accuracy * 100).toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
