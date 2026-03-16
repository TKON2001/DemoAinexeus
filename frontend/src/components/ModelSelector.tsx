interface Props {
  selected: string[];
  onChange: (value: string[]) => void;
}

const OPTIONS = ['gpt', 'gemini', 'deepseek', 'llama'];

export function ModelSelector({ selected, onChange }: Props) {
  const toggle = (model: string) => {
    if (selected.includes(model)) {
      onChange(selected.filter((m) => m !== model));
      return;
    }

    onChange([...selected, model]);
  };

  return (
    <div>
      <h2>Chọn mô hình</h2>
      {OPTIONS.map((model) => (
        <label key={model} style={{ display: 'block' }}>
          <input type="checkbox" checked={selected.includes(model)} onChange={() => toggle(model)} /> {model.toUpperCase()}
        </label>
      ))}
    </div>
  );
}
