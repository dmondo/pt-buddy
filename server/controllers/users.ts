import { Request, Response } from 'express';
import { findUser, saveUser, findReminderByUser } from '../../database/index';

const postUser = (req: Request, res: Response): void => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ msg: 'please enter all fields' });
    return;
  }

  saveUser(req.body, (err: Error, type: string) => {
    if (err) {
      res.sendStatus(500);
    } else if (type === 'exists') {
      res.status(400).json({ msg: 'user already exists' });
    } else {
      res.sendStatus(200);
    }
  });
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: 'please enter all fields' });
    return;
  }

  await findUser(req.body, async (err: Error, data: IDBUser, type: string) => {
    if (err) {
      res.sendStatus(500);
    } else if (type === 'badUser') {
      res.status(400).json({ msg: 'incorrect login info' });
    } else {
      const { ptuuid } = data;
      const reminders = await findReminderByUser(ptuuid);

      if (reminders) {
        res.json({ ...data, reminders });
      } else {
        res.json({ ...data, reminders: [] });
      }
    }
  });
};

export { postUser, getUser };
