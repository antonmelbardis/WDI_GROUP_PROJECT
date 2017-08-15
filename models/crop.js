const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true},
  description: { type: String, trim: true, required: true},
  thumbnail: { type: String, trim: true},
  image: { type: String, trim: true}
});

module.exports = mongoose.model('Crop', cropSchema);
