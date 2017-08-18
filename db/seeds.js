const mongoose = require('mongoose');
const rp = require('request-promise');
const config = require('../config/config');
const Crop = require('../models/crop');
mongoose.Promise = require('bluebird');
const User = require('../models/user');
const Allotment = require('../models/allotment');


User.collection.drop();
Crop.collection.drop();
Allotment.collection.drop();
mongoose.connect(config.db.development);

const globalObj = {};
globalObj.count = 1;

let newInterval = setInterval(saveCrops, 2000);

function saveAllotment() {

  globalObj.options = {
    uri: `http://api.datapress.io/api/3/action/datastore_search?resource_id=b40c84cf-be67-4b99-bff4-c3ff08b37698&limit=800`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(globalObj.options)
  .then((data) => {
    console.log(data.result.records);
    data.result.records.forEach(record => {
      Allotment.create({
        name: record.Name,
        borough: record.Borough,
        nearestPostcode: record.NearestPostcode,
        location: record.Location,
        latitude: record.Latitude,
        longitude: record.Longitude
      });
    });
  })
  .then(allotments => {
    // console.log(`${allotments.length} allotments were created!`);
  })
  .finally(() => {
    saveDummyData();
  });
}

function saveDummyData() {
  User
  .create([{
    username: 'amelbardis',
    firstName: 'Anton',
    lastName: 'Melbardis',
    email: 'melbardis@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    postcode: 'ec1y4ab',
    myAllotment: []
  }])
  .then(users => {
    console.log(`${users.length} users were created`);
    Allotment
    .findOne({name: 'Abbots Way'})
    .exec()
    .then(allotment => {
      users[0].allotments.push(allotment._id);
      users[0].save();
      console.log(users[0]);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveCrops();
    });
  });
}

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
    image: crop.image
  });
}

saveAllotment();
