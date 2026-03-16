import express from 'express';
import cors from 'cors';
import evaluationRoutes from './routes/evaluationRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/evaluate', evaluationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
