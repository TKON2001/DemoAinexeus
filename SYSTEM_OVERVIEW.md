# Tổng quan hệ thống AI Nexus Evaluation Platform

## 1) Mục tiêu
AI Nexus Evaluation Platform là nền tảng đánh giá đa tầng để so sánh hiệu năng nhiều mô hình ngôn ngữ lớn (LLM) trong các kịch bản thực tế. Hệ thống kế thừa UI từ AI Nexus Pro (React + TypeScript) và bổ sung backend cùng pipeline đánh giá để:

- Chạy benchmark nhiều mô hình song song.
- Đo các chỉ số vận hành và chất lượng.
- Trình bày kết quả trực quan bằng bảng và biểu đồ.
- Hỗ trợ tiếng Việt toàn diện cho người dùng cuối.

---

## 2) Kiến trúc tổng thể

```text
Người dùng
    │
    ▼
Frontend (React + Tailwind, giao diện tiếng Việt)
    │
    ▼
Backend API (Node.js + Express)
    │
    ▼
┌─────────────────────────────────────────────────┐
│       LLM Evaluation Engine                     │
│  - Dataset Manager     - LLM Runner             │
│  - Prompt Generator    - Metrics Collector      │
│  - Scoring Engine      - Result Storage         │
└─────────────────────────────────────────────────┘
    │
    ▼
Cơ sở dữ liệu / báo cáo
```

### 2.1 Frontend (React + TypeScript + Tailwind)

Dashboard tiếng Việt bao gồm các thành phần chính:

- `PromptInput`: nhập câu hỏi/yêu cầu benchmark.
- `ModelSelector`: chọn một hoặc nhiều mô hình.
- `BenchmarkRunner`: kích hoạt chạy đánh giá.
- `ResponseComparisonPanel`: so sánh câu trả lời giữa các mô hình.
- `MetricsPanel`: hiển thị latency, token, cost, accuracy...
- `ResultTable`: bảng tổng hợp kết quả.
- `RadarChart`: biểu đồ radar so sánh tiêu chí.

### 2.2 Backend API (Node.js + Express)

API chịu trách nhiệm nhận yêu cầu từ frontend và điều phối pipeline. Ví dụ endpoint:

- `POST /api/evaluate`: nhận `prompt` + danh sách `models`, chạy benchmark, trả kết quả.

Backend tách module rõ ràng:

- `controllers`: điều phối request/response.
- `services`: gọi LLM, đo metric, chấm điểm.
- `datasets`: nạp dữ liệu benchmark.
- `models/schemas`: chuẩn hóa dữ liệu kết quả.
- `routes`: định tuyến endpoint.

---

## 3) Cấu trúc thư mục đề xuất

```text
llm-evaluation-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── evaluationController.ts
│   │   ├── services/
│   │   │   ├── llmRunner.ts
│   │   │   ├── metricsService.ts
│   │   │   └── scoringService.ts
│   │   ├── datasets/
│   │   │   └── datasetLoader.ts
│   │   ├── models/
│   │   │   └── resultSchema.ts
│   │   ├── routes/
│   │   │   └── evaluationRoutes.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PromptInput.tsx
│   │   │   ├── ModelSelector.tsx
│   │   │   ├── ResponseComparisonPanel.tsx
│   │   │   ├── MetricsPanel.tsx
│   │   │   ├── ResultTable.tsx
│   │   │   └── RadarChart.tsx
│   │   ├── services/
│   │   │   └── apiClient.ts
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   └── App.tsx
│   └── package.json
└── datasets/
    ├── benchmark_qa.json
    ├── benchmark_math.json
    └── benchmark_code.json
```

---

## 4) Evaluation Engine (phần cốt lõi)

Luồng xử lý chuẩn:

1. Frontend gửi `prompt` và danh sách `models`.
2. `EvaluationController` nhận request.
3. `LLM Runner` gọi API từng mô hình (song song với `Promise.all`).
4. `Metrics Collector` đo latency, token, cost.
5. `Scoring Engine` tính accuracy/similarity/BLEU/ROUGE.
6. `Result Storage` lưu kết quả.
7. API trả JSON để frontend hiển thị bảng/biểu đồ.

### 4.1 Pipeline đánh giá đa tầng

- **Layer 1 – Deterministic checks**: kiểm tra format, timeout, giới hạn độ dài.
- **Layer 2 – Heuristic scoring**: semantic similarity, factual consistency.
- **Layer 3 – LLM-as-Judge**: dùng LLM chấm chất lượng hoặc xếp hạng.
- **Layer 4 – Human evaluation**: phản hồi đánh giá thực tế từ người dùng.

---

## 5) Chỉ số đánh giá

- **Latency**: thời gian phản hồi (giây).
- **Token usage**: số token đầu ra.
- **Cost**: chi phí ước tính theo mô hình và token.
- **Accuracy**: tỷ lệ đúng với câu hỏi có đáp án chuẩn.
- **Semantic similarity**: độ gần nghĩa giữa output và reference.
- **BLEU/ROUGE**: đánh giá chất lượng ngôn ngữ (dịch/tóm tắt).
- **Conciseness**: mức ngắn gọn (thường theo token).

Ví dụ output JSON:

```json
[
  {
    "model": "GPT",
    "latency": 1.8,
    "tokens": 120,
    "cost": 0.03,
    "accuracy": 0.92,
    "similarity": 0.95
  }
]
```

---

## 6) Dataset benchmark mẫu

```json
[
  {
    "question": "Thủ đô của Việt Nam là gì?",
    "answer": "Hà Nội"
  },
  {
    "question": "Tính 25 + 37 bằng bao nhiêu?",
    "answer": "62"
  }
]
```

---

## 7) Tích hợp đa mô hình

Mỗi mô hình có adapter/hàm gọi API riêng trong `llmRunner.ts`:

- `runGPT`
- `runGemini`
- `runDeepSeek`
- `runLlama`

Hàm `runModel(prompt, modelName)` định tuyến theo tên mô hình. Chạy song song:

```ts
const results = await Promise.all(
  models.map(async (m) => {
    const start = performance.now();
    const text = await runModel(prompt, m);
    const end = performance.now();

    return {
      model: m,
      response: text,
      latency: (end - start) / 1000,
    };
  })
);
```

Thiết kế này giúp mở rộng nhanh: thêm mô hình mới chỉ cần viết thêm adapter và đăng ký vào router.

---

## 8) Giao diện tiếng Việt (Vietnamese-first UX)

Một số nhãn chuẩn hóa:

- Prompt → **Nhập yêu cầu**
- Response → **Phản hồi**
- Latency → **Thời gian phản hồi**
- Token Usage → **Số token**
- Cost → **Chi phí**
- Accuracy → **Độ chính xác**

Prompt system gợi ý:

```text
Bạn là trợ lý AI thông minh, trả lời bằng tiếng Việt rõ ràng và ngắn gọn.
Câu hỏi: {question}
```

---

## 9) Mã khung tham khảo

### 9.1 `server.ts`

```ts
import express from "express";
import evaluationRoutes from "./routes/evaluationRoutes";

const app = express();
app.use(express.json());
app.use("/api/evaluate", evaluationRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
```

### 9.2 `datasetLoader.ts`

```ts
import fs from "fs";

export function loadDataset(name: string) {
  const data = fs.readFileSync(`../datasets/${name}.json`, "utf8");
  return JSON.parse(data);
}
```

### 9.3 `llmRunner.ts`

```ts
import axios from "axios";

export async function runGPT(prompt: string): Promise<string> {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    }
  );

  return response.data.choices[0].message.content;
}
```

### 9.4 `metricsService.ts`

```ts
export function measureLatency(start: number, end: number) {
  return (end - start) / 1000;
}

export function estimateTokens(text: string) {
  return Math.ceil(text.length / 4);
}
```

### 9.5 `scoringService.ts`

```ts
export function calculateAccuracy(output: string, reference: string) {
  return output.trim() === reference.trim() ? 1 : 0;
}
```

### 9.6 `evaluationController.ts`

```ts
import { runBenchmark } from "../services/benchmarkEngine";

export async function evaluatePrompt(req, res) {
  const { prompt, models } = req.body;
  const start = performance.now();
  const results = await runBenchmark(prompt, models);
  const end = performance.now();

  res.json({
    results,
    totalTime: (end - start) / 1000,
  });
}
```

---

## 10) Kết luận

Thiết kế này đáp ứng tốt các yêu cầu của một nền tảng benchmark LLM hiện đại:

- Kiến trúc rõ ràng, dễ mở rộng.
- Tách lớp frontend/backend/evaluation engine.
- Đánh giá đa tiêu chí và đa tầng.
- Trải nghiệm tiếng Việt đồng nhất.
- Dễ tích hợp thêm mô hình và thêm bộ dữ liệu theo thời gian.
