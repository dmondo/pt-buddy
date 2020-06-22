import { Request, Response } from 'express';
import {
  saveReminder,
  removeReminder,
} from '../../database/index';
import { scheduleOne, deschedule } from '../sms/scheduler';

const postReminder = (req: Request, res: Response): void => {
  scheduleOne(req.body);
  saveReminder(req.body, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteReminder = (req: Request, res: Response): void => {
  const { uuid } = req.body;
  deschedule(uuid);
  removeReminder(req.body, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

export { postReminder, deleteReminder };
