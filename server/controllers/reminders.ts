import { Request, Response } from 'express';
import {
  saveReminder,
  findReminderByUser,
  removeReminder,
} from '../../database/index';

const postReminder = (req: Request, res: Response): void => {
  saveReminder(req.body, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const getReminders = (req: Request, res: Response): void => {
  findReminderByUser(req.body, (err: Error, data: IServerReminder[]) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
};

const deleteReminder = (req: Request, res: Response): void => {
  removeReminder(req.body, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

export { postReminder, getReminders, deleteReminder };
