const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
<<<<<<< HEAD
  Name: { type: String, unique: true, trim: true, required: true},
  Borough: { type: String, unique: true, trim: true, required: true},
  NearestPostcode: { type: String, unique: true, trim: true, required: true},
  Location: { type: String, unique: true, trim: true, required: true},
  Latitude: { type: String, unique: true, trim: true, required: true},
  Longitude: { type: String, unique: true, trim: true, required: true},
  _id: { type: Number, unique: true, required: true}
  // forSaleHere
=======
  name: { type: String, unique: true, trim: true, required: true},
  borough: { type: String, unique: true, trim: true, required: true},
  nearestPostcode: { type: String, unique: true, trim: true, required: true},
  location: { type: String, unique: true, trim: true, required: true},
  latitude: { type: String, unique: true, trim: true, required: true},
  longitude: { type: String, unique: true, trim: true, required: true},
  allotment_id: { type: Number, unique: true, required: true}
>>>>>>> development
});

module.exports = mongoose.model('Allotment', allotmentSchema);
