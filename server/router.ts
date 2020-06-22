import { Router, Request, Response } from 'express';
import path from 'path';
import { postReminder, getReminders, deleteReminder } from './controllers/reminders';
import { getUser, postUser } from './controllers/users';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

router.get('/reminders', getReminders);
router.post('/reminders', postReminder);
router.delete('/reminders', deleteReminder);

router.get('/users', getUser);
router.post('/users', postUser);

export default router;
