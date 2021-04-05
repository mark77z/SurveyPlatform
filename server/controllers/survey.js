let express = require('express');
let router = express.Router();

let Survey = require('../models/survey');


module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(surveyList);
        }
    });
}

module.exports.getSurveyById = (req, res, next) => {
    let id = req.params.id;
    //console.trace("id: %s", id);

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(surveyToEdit);
            res.json(surveyToEdit);
        }
    });
}

module.exports.createSurvey = (req, res, next) => {
    // SERIALIZE THE CART DATA
    let newSurvey = new Survey();

    newSurvey.title = req.body.title;
    newSurvey.expiration_dte = req.body.expiration_dte;
    newSurvey.questions = req.body.questions;
    newSurvey.questions.answers = req.body.questions.answers;
    newSurvey.userId = req.body.userId;

    // Add new Order Object to the Database
    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Created New Survey'});
        }
    }); 
}

module.exports.performUpdate = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = new Survey();

    updatedSurvey._id = id;
    updatedSurvey.title = req.body.title;
    updatedSurvey.expiration_dte = req.body.expiration_dte;
    updatedSurvey.questions = req.body.questions;
    updatedSurvey.questions.answers = req.body.questions.answers;

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Survey', updatedSurvey: updatedSurvey});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.json({success: true, msg: 'Successfully Deleted Survey'});
        }
    });
}