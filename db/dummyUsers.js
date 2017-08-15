const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config/config');

mongoose.connect(config.db);
const User = require('../models/user');
const Allotment = require('../models/allotment');

User.collection.drop();
Allotment.collection.drop();

Allotment
  .create({
    borough: 'Bromley',
    name: 'Barnmead Road',
    nearestPostcode: 'BR3 4LY',
    location: 'Between Railway tracks north of Thayers Farm Road',
    latitude: '51.410653',
    longitude: '-0.041668000000000004',
    allotment_id: 4
  })
  .then(allotment => {
    console.log(`${allotment.name} was created`);
    return User
    .create([{
      username: 'amelbardis',
      firstName: 'Anton',
      lastName: 'Melbardis',
      email: 'melbardis@gmail.com',
      password: 'password',
      passwordConfirmation: 'password',
      myAllotments: [allotment._id]
    },{
      username: 'ccatley2',
      firstName: 'Chris',
      lastName: 'Catley',
      email: 'ccatley@gmail.com',
      password: 'password',
      passwordConfirmation: 'password',
      myAllotments: [],
      otherDetails: 'lorem dasdljfdshljfdhsaljkfgfdlsajkfdljksafdshjafjdsfdhskljfksda'
    }]);
  })
  .then(users => {
    console.log(`${users.length} users were created`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
