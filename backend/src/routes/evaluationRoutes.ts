import { Router } from 'express';
import { evaluatePrompt } from '../controllers/evaluationController.js';

const router = Router();

router.post('/', evaluatePrompt);

export default router;
