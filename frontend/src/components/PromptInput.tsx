import { useState } from 'react';

interface Props {
  onSubmit: (prompt: string, referenceAnswer?: string) => void;
  loading?: boolean;
}

export function PromptInput({ onSubmit, loading = false }: Props) {
  const [prompt, setPrompt] = useState('Thủ đô của Việt Nam là gì?');
  const [reference, setReference] = useState('Hà Nội');

  return (
    <div>
      <h2>Nhập yêu cầu</h2>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} style={{ width: '100%' }} />
      <p>Đáp án chuẩn (tuỳ chọn)</p>
      <input value={reference} onChange={(e) => setReference(e.target.value)} style={{ width: '100%' }} />
      <button onClick={() => onSubmit(prompt, reference)} disabled={loading || !prompt.trim()}>
        {loading ? 'Đang chạy...' : 'Chạy đánh giá'}
      </button>
    </div>
  );
}
