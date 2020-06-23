import mongoose from 'mongoose';

const validUser = (val: string): boolean => (
  val.length > 1 && val.length <= 32
);

const validMail = (val: string): boolean => (
  val.includes('@')
  && val.length > 2
  && val[0] !== '@'
  && val[val.length - 1] !== '@'
);

const validPassword = (val: string): boolean => (
  val.length >= 5
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: validUser,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validMail,
  },
  password: {
    type: String,
    required: true,
    validate: validPassword,
  },
  ptuuid: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
