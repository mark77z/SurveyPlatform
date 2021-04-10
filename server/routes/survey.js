let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for getting survey list -- READ Operation */
router.get('/list', surveyController.displaySurveyList);

/* POST Route for processing survey creation - CREATE Operation */
router.post('/create', passport.authenticate('jwt', { session: false }), surveyController.createSurvey);

/* GET Route for getting survey - UPDATE Operation */
router.get('/get/:id', surveyController.getSurveyById);

/* GET Route for getting the number of surveys created by an specific user */
router.get('/get/count/forUser/:userId', passport.authenticate('jwt', { session: false }), surveyController.getSurveysCountPerUser);

/* GET Route for getting the number of answered surveys created by an specific user */
router.get('/get/answered/creator/:userId', passport.authenticate('jwt', { session: false }), surveyController.getSurveysAnsweredPerUser);

/* GET Route for getting the number of answered surveys created by an specific survey*/
router.get('/get/answered/survey/:surveyId', passport.authenticate('jwt', { session: false }), surveyController.getSurveysAnsweredPerSurvey);

/* GET Route for getting the number of correct answered surveys created by an specific user */
router.get('/get/answered/correct/creator/:userId', passport.authenticate('jwt', { session: false }), surveyController.getSurveysCorrectAnswersForCreator);

/* GET Route for getting the number of total answered surveys created by an specific user */
router.get('/get/answered/total/creator/:userId', passport.authenticate('jwt', { session: false }), surveyController.getSurveysTotalAnswersForCreator);

/* GET Route for getting the number of correct answered surveys created by an specific user */
router.get('/get/answered/correct/survey/:surveyId', passport.authenticate('jwt', { session: false }), surveyController.getSurveysCorrectAnswersForSurvey);

/* GET Route for getting the general gender stats*/
router.get('/get/answered/gender/creator/:userId', passport.authenticate('jwt', { session: false }), surveyController.getGeneralGenderStats);

/* GET Route for getting the general age stats*/
router.get('/get/answered/age/creator/:userId', passport.authenticate('jwt', { session: false }), surveyController.getGeneralAgeStats);

/* GET Route for getting the general gender stats*/
router.get('/get/answered/gender/survey/:surveyId', passport.authenticate('jwt', { session: false }), surveyController.getGenderStatsBySurvey);

/* GET Route for getting the general age stats*/
router.get('/get/answered/age/survey/:surveyId', passport.authenticate('jwt', { session: false }), surveyController.getAgeStatsBySurvey);

/* POST Route for processing survey edition - UPDATE Operation */
router.post('/update/:id', passport.authenticate('jwt', { session: false }), surveyController.performUpdate);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', passport.authenticate('jwt', { session: false }), surveyController.performDelete);

/* POST Route for processing survey response -- CREATE Operation */
router.post('/response/:id', surveyController.processSurveyResponse);

module.exports = router;