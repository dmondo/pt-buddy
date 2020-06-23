import mongoose, { Mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Reminder from './models/reminders';
import User from './models/users';
import Patient from './models/patients';
import Tag from './models/tags';

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
  useFindAndModify: false,
});

const saveReminder = async (reminder: IServerReminder, callback: errorCB): Promise<void> => {
  try {
    const {
      uuid,
      ptuuid,
      jobid,
      tag,
      text,
      date,
      time,
      ampm,
      daily,
      patientName,
      patientNumber,
      completed,
    } = reminder;
    const reminderDoc = new Reminder({
      uuid,
      ptuuid,
      jobid,
      tag,
      text,
      date,
      time,
      ampm,
      daily,
      patientName,
      patientNumber,
      completed,
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

const findReminderByUser = async (ptuuid: string): Promise<IServerReminder[] | Error> => {
  try {
    const reminder = await Reminder.find({ ptuuid });
    return reminder.map((doc: mongoose.Document) => doc.toObject());
  } catch (err) {
    return err;
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
  await Reminder.deleteMany({ uuid });
};

const completeReminder = async (jobid: string): Promise<void> => {
  await Reminder.findOneAndUpdate({ jobid }, { completed: true });
};

const saveUser = async (data: IUser, callback: ISaveUser): Promise<void> => {
  const {
    username,
    email,
    password,
    ptuuid,
  } = data;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      callback(null, 'exists');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hash,
      ptuuid,
    });
    await user.save();
    callback(null, 'newUser');
  } catch (err) {
    callback(err);
  }
};

const findUser = async (data: IVerify, callback: IFindUser): Promise<void> => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
      callback(null, null, 'badUser');
      return;
    }

    const userObj = user.toObject();

    const compare = await bcrypt.compare(password, userObj.password);

    if (!compare) {
      callback(null, null, 'badUser');
    } else {
      const returnData = {
        username: userObj.username,
        email: userObj.email,
        ptuuid: userObj.ptuuid,
        registerDate: userObj.registerDate,
      };
      callback(null, returnData, 'user');
    }
  } catch (err) {
    callback(err);
  }
};

const saveTags = async (data: ITag[]): Promise<null | Error> => {
  try {
    const dbData = data.map((dat: ITag) => {
      const {
        uuid,
        ptuuid,
        tag,
        text,
      } = dat;
      const tagDoc = new Tag({
        uuid,
        ptuuid,
        tag,
        text,
      });
      return tagDoc;
    });

    dbData.forEach(async (record) => {
      await record.save();
    });
    return null;
  } catch (err) {
    return err;
  }
};

const findTags = async (ptuuid: string): Promise<ITag[]> => {
  try {
    const tags = await Tag.find({ ptuuid });
    return tags.map((doc: mongoose.Document) => doc.toObject());
  } catch (err) {
    return err;
  }
};

const savePatients = async (data: IPatient[]): Promise<null | Error> => {
  try {
    const dbData = data.map((dat: IPatient) => {
      const {
        uuid,
        ptuuid,
        patientName,
        patientNumber,
      } = dat;
      const patientDoc = new Patient({
        uuid,
        ptuuid,
        patientName,
        patientNumber,
      });
      return patientDoc;
    });

    dbData.forEach(async (record) => {
      await record.save();
    });
    return null;
  } catch (err) {
    return err;
  }
};

const findPatients = async (ptuuid: string): Promise<IPatient[]> => {
  try {
    const patients = await Patient.find({ ptuuid });
    return patients.map((doc: mongoose.Document) => doc.toObject());
  } catch (err) {
    return err;
  }
};

export {
  saveReminder,
  findReminder,
  findRemindersSchedule,
  findReminderByUser,
  removeReminder,
  removeReminderSchedule,
  completeReminder,
  saveUser,
  findUser,
  findTags,
  saveTags,
  savePatients,
  findPatients,
};
