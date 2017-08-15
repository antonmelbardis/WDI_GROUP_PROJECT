module.exports = {
  index: cropsIndex
};

const Crop = require('../models/crop');

function cropsIndex(req, res) {
  Crop.find((err, crops) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    return res.status(200).json(crops);
  });
}
