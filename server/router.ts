import { Router, Request, Response } from 'express';
import path from 'path';
import { postReminder, deleteReminder } from './controllers/reminders';
import { getUser, postUser } from './controllers/users';
import { getTags, postTags } from './controllers/tags';
import { getPatients, postPatients } from './controllers/patients';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

router.post('/reminders', postReminder);
router.delete('/reminders', deleteReminder);

router.post('/auth', getUser);
router.post('/users', postUser);

router.get('/tags/:ptuuid', getTags);
router.post('/tags', postTags);

router.get('/patients/:ptuuid', getPatients);
router.post('/patients', postPatients);

export default router;
