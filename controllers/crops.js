module.exports = {
  index: cropsIndex,
  show: cropsShow,
  save: cropsSave,
  delete: cropDelete
};

const Crop = require('../models/crop');
const User = require('../models/user');

function cropsIndex(req, res) {
  Crop.find((err, crops) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    return res.status(200).json(crops);
  });
}

function cropsShow(req, res) {
  Crop
  .findById(req.params.id, (err, crop) => {
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    if(!crop) return res.status(404).json({ message: 'Crop not found'});
    return res.status(200).json(crop);
  });
}

function cropsSave(req, res) {
  User
  .findById(req.params.userId)
  .exec()
  .then(user => {
    if (user.forSale.indexOf(req.params.id) === -1) {
      user.forSale.push(req.params.id);
      user.save();
      res.status(200).json(user);
    } else {
      res.status(422).json({ message: 'Crop already saved.'});
    }
  })
  .catch(err => res.status(500).json(err));
}

function cropDelete(req, res) {
  User
  .findById(req.params.userId)
  .exec()
  .then(user => {
    console.log(user);
    console.log(`ID ********* ${req.params.id}`);
    if(user.forSale.indexOf(req.params.id) > -1) {
      user.forSale.splice(user.forSale.indexOf(req.params.id), 1);
      return user.save();
    }
  })
  .then(() => {
    User
    .findById(req.params.userId)
    .populate('forSale')
    .exec()
    .then(catfish => {
      res.status(200).json(catfish);
    });
  });
}
