const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true},
  description: { type: String, trim: true, required: true},
  thumbnail: { type: String, unique: true, trim: true, required: true},
  image: { type: String, unique: true, trim: true, required: true},
  id: { type: String, unique: true, trim: true, required: true}
});

module.exports = mongoose.model('Crop', cropSchema);
