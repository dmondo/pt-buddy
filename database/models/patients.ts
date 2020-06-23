import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  uuid: { type: String, unique: true },
  ptuuid: String,
  patientName: String,
  patientNumber: String,
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
