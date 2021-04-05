let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for getting survey list -- READ Operation */
router.get('/list', surveyController.displaySurveyList);

/* POST Route for processing survey creation - CREATE Operation */
router.post('/create', passport.authenticate('jwt', {session: false}), surveyController.createSurvey);

/* GET Route for getting survey - UPDATE Operation */
router.get('/get/:id', surveyController.getSurveyById);

/* POST Route for processing survey edition - UPDATE Operation */
router.post('/update/:id', passport.authenticate('jwt', {session: false}), surveyController.performUpdate);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), surveyController.performDelete);

module.exports = router;