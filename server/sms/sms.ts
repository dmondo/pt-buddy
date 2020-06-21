import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();
const { TWILIO_SID, TWILIO_AUTH } = process.env;

const client = twilio(TWILIO_SID, TWILIO_AUTH);

const sms = async (patientNumber: string, reminder: string): Promise<void> => {
  await client.messages.create({
    to: patientNumber,
    from: '+12565703312',
    body: reminder,
  });
};

export default sms;
