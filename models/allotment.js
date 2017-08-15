const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true},
  borough: { type: String, unique: true, trim: true, required: true},
  nearestPostcode: { type: String, unique: true, trim: true, required: true},
  location: { type: String, unique: true, trim: true, required: true},
  latitude: { type: String, unique: true, trim: true, required: true},
  longitude: { type: String, unique: true, trim: true, required: true},
  allotment_id: { type: Number, unique: true, required: true}
});

module.exports = mongoose.model('Allotment', allotmentSchema);
