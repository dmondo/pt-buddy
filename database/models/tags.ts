import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  uuid: { type: String, unique: true },
  ptuuid: String,
  tag: String,
  text: String,
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
