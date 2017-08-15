module.exports = {
  index: allotmentsIndex,
  show: allotmentShow
};

const Allotment = require('../models/allotment');

function allotmentsIndex(req, res) {
  Allotment.find((err, allotments) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    return res.status(200).json(allotments);
  });
}

function allotmentShow(req, res) {
  Allotment.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    if(!user) return res.status(404).json({ message: 'Allotment not found'});
    return res.status(200).json(allotment);
  });
}
