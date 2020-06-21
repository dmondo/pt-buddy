import sms from './sms';

const scheduler = (): void => {
  // grab all reminders from the database
  // grab current time, e.g. with new Date
  // for each reminder, check if its time is >= Date time
  // if it is, call sms with that message, remove that reminder from the database
};

export default scheduler;
