import mongoose from 'mongoose';

const validPhone = (val: string): boolean => (
  val.length === 12 && val[0] === '+'
);

const validTime = (val: string): boolean => {
  if (
    Number.isNaN(Number(val[0]))
    || Number.isNaN(Number(val[1]))
    || Number.isNaN(Number(val[3]))
    || Number.isNaN(Number(val[4]))
  ) {
    return false;
  }

  if (val[2] !== ':') { return false; }
  if (
    Number(val[0]) < 0
    || Number(val[0]) > 2
    || Number(val[1]) < 0
    || Number(val[3]) < 0
    || Number(val[3]) > 5
    || Number(val[4]) < 0
  ) {
    return false;
  }
  return true;
};

const validAMPM = (val: string): boolean => (
  val === 'am' || val === 'pm'
);

const reminderSchema = new mongoose.Schema({
  uuid: String,
  ptuuid: String,
  jobid: String,
  tag: String,
  text: String,
  date: Date,
  time: { type: String, validate: validTime },
  ampm: { type: String, validate: validAMPM },
  daily: Boolean,
  patientNumber: { type: String, validate: validPhone },
  patientName: String,
  completed: Boolean,
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
