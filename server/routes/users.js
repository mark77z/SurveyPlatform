let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let userController = require('../controllers/users');

/* GET Route for getting survey - UPDATE Operation */
router.get('/get/:username', passport.authenticate('jwt', { session: false }), userController.getUserByUsername);

/* POST Route for processing survey edition - UPDATE Operation */
router.post('/update/:username', passport.authenticate('jwt', { session: false }), userController.performUpdate);

module.exports = router;