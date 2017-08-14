const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
  Name: { type: String, unique: true, trim: true, required: true},
  Borough: { type: String, unique: true, trim: true, required: true},
  NearestPostcode: { type: String, unique: true, trim: true, required: true},
  Location: { type: String, unique: true, trim: true, required: true},
  Latitude: { type: String, unique: true, trim: true, required: true},
  Longitude: { type: String, unique: true, trim: true, required: true},
  _id: { type: Number, unique: true, required: true}
});

module.exports = mongoose.model('Allotment', allotmentSchema);
