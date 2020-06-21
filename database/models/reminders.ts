import mongoose from 'mongoose';

const validPhone = (val: string): boolean => (
  val.length === 12 && val[0] === '+'
);

const reminderSchema = new mongoose.Schema({
  uuid: String,
  ptuuid: String,
  tag: String,
  text: String,
  date: Date,
  patientNumber: { type: String, validate: validPhone },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
