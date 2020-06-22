import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Reminder from './models/reminders';

dotenv.config();

const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT } = process.env;

const cnxs = {
  dev: 'mongodb://localhost/ptbuddy',
  prod: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
};

const cnx = cnxs.dev;

mongoose.connect(cnx, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const saveReminder = async (reminder: IServerReminder, callback: errorCB): Promise<void> => {
  try {
    const {
      uuid,
      ptuuid,
      tag,
      text,
      date,
      patientNumber,
    } = reminder;
    const reminderDoc = new Reminder({
      uuid,
      ptuuid,
      tag,
      text,
      date,
      patientNumber,
    });
    await reminderDoc.save();
    callback(null);
  } catch (err) {
    callback(err);
  }
};

const findReminder = async (uuid: string, callback: IReminderCallback): Promise<void> => {
  try {
    const reminder = await Reminder.find({ uuid });
    callback(null, reminder.map((doc: mongoose.Document) => doc.toObject()));
  } catch (err) {
    callback(err);
  }
};

const findRemindersSchedule = async (): Promise<IServerReminder[]> => {
  try {
    const reminders = await Reminder.find({});
    return reminders.map((doc: mongoose.Document) => doc.toObject());
  } catch (err) {
    return err;
  }
};

const findReminderByUser = async (ptuuid: string, callback: IReminderCallback): Promise<void> => {
  try {
    const reminder = await Reminder.find({ ptuuid });
    callback(null, reminder.map((doc: mongoose.Document) => doc.toObject()));
  } catch (err) {
    callback(err);
  }
};

const removeReminder = async (data: IUUID, callback: errorCB): Promise<void> => {
  try {
    const { uuid } = data;
    await Reminder.findOneAndDelete({ uuid });
    callback(null);
  } catch (err) {
    callback(err);
  }
};

const removeReminderSchedule = async (uuid: string): Promise<void> => {
  await Reminder.findOneAndDelete({ uuid });
};

export {
  saveReminder,
  findReminder,
  findRemindersSchedule,
  findReminderByUser,
  removeReminder,
  removeReminderSchedule,
};
