const express = require('express');
const router = express.Router();

const authentications = require('../controllers/authentications');
const users = require('../controllers/users');
const allotments = require('../controllers/allotments');
const crops = require('../controllers/crops');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

router.route('/users')
.get(users.index);
router.route('/users/:id')
.get(users.show)
.put(users.update)
.delete(users.delete);

router.route('/allotments')
.get(allotments.index);
router.route('/allotments/:id')
.get(allotments.show);

router.route('/allotments/:id/save/:userId')
  .get(allotments.save);

router.route('/crops')
.get(crops.index);
router.route('/crops/:id')
.get(crops.show);
router.route('/crops/:id/save/:userId')
.get(crops.save)
.delete(crops.delete);

module.exports = router;
