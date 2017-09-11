module.exports = {
  index: allotmentsIndex,
  show: allotmentsShow,
  save: allotmentsSave
};

const Allotment = require('../models/allotment');
const User      = require('../models/user');

function allotmentsIndex(req, res) {
  Allotment.find((err, allotments) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    return res.status(200).json(allotments);
  });
}

function allotmentsShow(req, res) {
  Allotment.findById(req.params.id, (err, allotment) => {
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    if(!allotment) return res.status(404).json({ message: 'Allotment not found'});
    return res.status(200).json(allotment);
  });
}

function allotmentsSave(req, res) {
  User
    .findById(req.params.userId)
    .exec()
    .then(user => {
      if (user.allotments.length === 0) {
        user.allotments.push(req.params.id);
        user.save();
        res.status(200).json(user);
      } else {
        res.status(422).json({ message: 'You already have an allotment'});
      }
    })
    .catch(err => res.status(500).json(err));
}
