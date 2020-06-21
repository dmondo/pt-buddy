import sms from './sms';
import { removeReminderSchedule, findRemindersSchedule } from '../../database/index';

const scheduler = async (): Promise<void> => {
  const reminders = await findRemindersSchedule();
  reminders.forEach(async (reminder: IServerReminder) => {
    const {
      uuid,
      text,
      date,
      patientNumber,
    } = reminder;
    const currentTime = new Date();
    if (currentTime.getTime() >= date.getTime()) {
      await sms(patientNumber, text);
      await removeReminderSchedule(uuid);
    }
  });
};

export default scheduler;
