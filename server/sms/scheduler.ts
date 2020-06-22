import schedule from 'node-schedule';
import sms from './sms';
import { findRemindersSchedule, completeReminder } from '../../database/index';

const jobs = [];

const startScheduler = async (): Promise<void> => {
  const reminders = await findRemindersSchedule();
  reminders.forEach(async (reminder: IServerReminder) => {
    const {
      uuid,
      jobid,
      text,
      date,
      daily,
      patientNumber,
      completed,
    } = reminder;
    const parsedDate = new Date(date);
    if (!completed) {
      if (daily) {
        const job = schedule.scheduleJob(parsedDate, async () => {
          await sms(patientNumber, text);
        });
        jobs.push({ uuid, job });
      } else {
        const job = schedule.scheduleJob(parsedDate, async () => {
          await sms(patientNumber, text);
          await completeReminder(jobid);
        });
        jobs.push({ uuid, job });
      }
    }
  });
};

const scheduleOne = async (reminder: IServerReminder): Promise<void> => {
  const {
    uuid,
    jobid,
    text,
    date,
    daily,
    patientNumber,
  } = reminder;
  const parsedDate = new Date(date);
  if (daily) {
    const job = schedule.scheduleJob(parsedDate, async () => {
      await sms(patientNumber, text);
    });
    jobs.push({ uuid, job });
  } else {
    const job = schedule.scheduleJob(parsedDate, async () => {
      await sms(patientNumber, text);
      await completeReminder(jobid);
    });
    jobs.push({ uuid, job });
  }
};

const deschedule = async (uuid: string): Promise<void> => {
  const deleteIndices = [];
  jobs.forEach((job, i) => {
    if (job.uuid === uuid) {
      deleteIndices.push(i);
    }
  });

  deleteIndices.forEach(async (index) => {
    jobs[index].job.cancel();
  });
};

export { startScheduler, scheduleOne, deschedule };
