const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  song: { type: String, required: true },
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;