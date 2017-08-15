module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};

const User = require('../models/user');
const Allotment = require('../models/allotment');


function usersIndex(req, res) {
  User.find((err, users) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    return res.status(200).json(users);
  });
}

function usersShow(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    if(!user) return res.status(404).json({ message: 'User not found'});
    return res.status(200).json(user);
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, { new: true}, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    if(!user) return res.status(404).json({ message: 'User not found'});
    return res.status(200).json(user);
  });
}




// Find the user you want to update
// Get the id of the allotment that you've sent across
// Push that id into the user's array of allotment id's
// save() that user so that the data persists in your database
// return confirmation or json with the updated user back to the front end, to be received in the .then() of your angular controller

// function usersUpdate(req, res) {
//   const user = req.query.user; //get the user
//   const allotment = req.query.allotment; //get the allotment
//   Allotment
//   .findById(allotment)
//   .then(() => {
//     User
//     .findById(user)
//     .then(user =>{
//       user.myAllotment.push(allotment);
//       user.save();
//       return res.json(user);
//     });
//   });
// }

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    if(!user) return res.status(404).json({ message: 'User not found'});
    return res.sendStatus(204);
  });
}
