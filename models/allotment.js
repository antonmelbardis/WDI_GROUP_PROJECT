const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
  name: { type: String, trim: true},
  borough: { type: String, trim: true},
  nearestPostcode: { type: String, trim: true},
  location: { type: String, trim: true},
  latitude: { type: String, trim: true},
  longitude: { type: String, trim: true}
});

module.exports = mongoose.model('Allotment', allotmentSchema);
