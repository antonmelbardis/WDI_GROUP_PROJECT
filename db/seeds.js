const mongoose = require('mongoose');
const rp = require('request-promise');
const config = require('../config/config');
const Crop = require('../models/crop');
mongoose.Promise = require('bluebird');

Crop.collection.drop();
mongoose.connect(config.db);

const globalObj = {};
globalObj.count = 1;

let newInterval = setInterval(saveCrops, 1000);

function saveCrops() {

  globalObj.options = {
    uri: `http://api.seasonsapp.com/crops/categories/${globalObj.count}/?format=json`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(globalObj.options)
  .then((data) => {
    globalObj.content = data;
    globalObj.finalString = data.substring(0, data.length - 17);
    // console.log(`FINAL STRING ${globalObj.finalString}`);
  });
  setTimeout(function() {
    globalObj.jsonObj = JSON.parse(globalObj.finalString);
    globalObj.jsonObj.crops.forEach(function(crop) {
      saveDbItems(crop);
      // console.log(crop.name);
      // console.log(crop.description);
      // console.log(crop.thumbnail);
      // console.log(crop.image);
      // console.log(crop.id);
    });
  }, 500);

  if (globalObj.count === 5) {
    clearInterval(newInterval);
    mongoose.connection.close();
  }
  globalObj.count++;
}

function saveDbItems(crop) {
  Crop
  .create({
    name: crop.name,
    description: crop.description,
    thumbnail: crop.thumbnail,
    image: crop.image,
    id: crop.id
  });
}

saveCrops();
