module.exports = {
  index: allotmentsIndex
};

const Allotment = require('../models/allotment');

function allotmentsIndex(req, res) {
  Allotment.find((err, allotments) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    return res.status(200).json(allotments);
  });
}
