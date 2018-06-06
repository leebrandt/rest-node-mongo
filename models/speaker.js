const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeakerSchema = Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  // sessions: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'Session' }]
  // }
});

module.exports = mongoose.model('Speaker', SpeakerSchema);
