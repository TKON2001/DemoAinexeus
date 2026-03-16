# AI Nexus Evaluation Platform (Scaffold)

## Cấu trúc
- `backend`: API Node.js + Express để chạy benchmark LLM.
- `frontend`: React + TypeScript dashboard tiếng Việt.
- `datasets`: dữ liệu benchmark mẫu.

## Chạy backend
```bash
cd backend
npm install
npm run dev
```

## Chạy frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ gọi API qua `/api/evaluate` (proxy về `localhost:5000`).
