import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

export default router;
