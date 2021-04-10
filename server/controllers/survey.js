let express = require('express');
let router = express.Router();
let Survey = require('../models/survey');
let Response = require('../models/response');
const e = require('express');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            res.json(surveyList);
        }
    });
}

module.exports.getSurveysAnsweredPerUser = (req, res, next) => {
    let userId = req.params.userId;

    Survey.find({ userId: userId }, function(err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            var ids = surveys.map(function(survey) { return survey._id; });
            Response.countDocuments({ surveyId: { $in: ids } }, function(err, count) {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {
                    res.json({ success: true, totalCount: count });
                }
            });
        }
    });

}

module.exports.getSurveysAnsweredPerSurvey = (req, res, next) => {
    let surveyId = req.params.surveyId;
    console.log(surveyId);

    Response.find({ surveyId: surveyId }, function(err, responses) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            var count = responses.length
            res.json({ count });
        }
    });

}

module.exports.getGenderStatsBySurvey = (req, res, next) => {
    let surveyId = req.params.surveyId;
    Response.aggregate(
        [
            { "$match": { "surveyId": { "$eq": surveyId } } },
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 }
                }
            }
        ]).exec(function(err, result) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ result });
        }
    });
}

module.exports.getAgeStatsBySurvey = (req, res, next) => {
    let surveyId = req.params.surveyId;
    Response.aggregate(
        [
            { "$match": { "surveyId": { "$eq": surveyId } } },
            {
                $group: {
                    _id: "$age",
                    count: { $sum: 1 }
                }
            }
        ]).exec(function(err, result) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ result });
        }
    });
}

module.exports.getGeneralGenderStats = (req, res, next) => {
    let userId = req.params.userId;
    Survey.find({ userId: userId }, function(err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            var ids = surveys.map(function(survey) { return "" + survey._id + ""; });
            Response.aggregate(
                [
                    { "$match": { "surveyId": { "$in": ids } } },
                    {
                        $group: {
                            _id: "$gender",
                            count: { $sum: 1 }
                        }
                    }
                ]).exec(function(err, result) {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {
                    res.json({ result });
                }
            });
        }
    });
}

module.exports.getGeneralAgeStats = (req, res, next) => {
    let userId = req.params.userId;
    Survey.find({ userId: userId }, function(err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            var ids = surveys.map(function(survey) { return "" + survey._id + ""; });
            Response.aggregate(
                [
                    { "$match": { "surveyId": { "$in": ids } } },
                    {
                        $group: {
                            _id: "$age",
                            count: { $sum: 1 }
                        }
                    }
                ]).exec(function(err, result) {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {
                    res.json({ result });
                }
            });
        }
    });
}

module.exports.getSurveysTotalAnswersForCreator = function(req, res, next) {
    let userId = req.params.userId;

    Survey.find({ userId: userId }, function(err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            var ids = surveys.map(function(survey) { return "" + survey._id + ""; });
            Response.aggregate(
                [
                    { "$match": { "surveyId": { "$in": ids } } },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: "$totalQuestions" }
                        }
                    }
                ]).exec(function(err, result) {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {
                    res.json({ result });
                }
            });
        }
    });
}

module.exports.getSurveysCorrectAnswersForSurvey = function(req, res, next) {
    let surveyId = req.params.surveyId;

    Response.aggregate(
        [
            { "$match": { "surveyId": { "$eq": surveyId } } },
            {
                $group: {
                    _id: null,
                    totalCorrect: {
                        $sum: "$correctAnswers"
                    }
                }
            }
        ]).exec(function(err, result) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            if (result.length > 0) {
                res.json({ success: true, totalCorrect: result[0].totalCorrect });
            } else {
                res.json({ success: true, totalCorrect: 0 });
            }
        }
    });
}



module.exports.getSurveysCorrectAnswersForCreator = function(req, res, next) {
    let userId = req.params.userId;

    Survey.find({ userId: userId }, function(err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            var ids = surveys.map(function(survey) { return "" + survey._id + ""; });
            Response.aggregate(
                [
                    { "$match": { "surveyId": { "$in": ids } } },
                    {
                        $group: {
                            _id: null,
                            totalCorrect: {
                                $sum: "$correctAnswers"
                            }
                        }
                    }
                ]).exec(function(err, result) {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {
                    if (result.length > 0) {
                        res.json({ success: true, totalCorrect: result[0].totalCorrect });
                    } else {
                        res.json({ success: true, totalCorrect: 0 });
                    }
                }
            });
        }
    });
}

module.exports.getSurveysCountPerUser = (req, res, next) => {
    let userId = req.params.userId;

    Survey.countDocuments({ userId: userId }, function(err, count) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, count: count });
        }
    });
}

module.exports.getSurveyById = (req, res, next) => {
    let id = req.params.id;
    //console.trace("id: %s", id);

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            return console.error(err);
        } else {
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
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'Successfully Created New Survey' });
        }
    });
}

module.exports.processSurveyResponse = (req, res, next) => {
    let id = req.params.id
    let newResponse = new Response();
    let correctAnswers = 0;

    Survey.findById(id, (err, answeredSurvey) => {
        if (err) {
            return console.error(err);
        } else {
            newResponse.surveyId = id;
            newResponse.age = req.body.age;
            newResponse.gender = req.body.gender;
            newResponse.questions = req.body.questions;
            newResponse.totalQuestions = req.body.questions.length;
            newResponse.questions.answers = req.body.questions.answers;

            answeredSurvey.questions.forEach(question => {
                if (question.type === "MCQ") {
                    var answeredQuestion = newResponse.questions.find(q => q.text === question.text);
                    var isCorrect = true;
                    question.answers.forEach(answer => {
                        if (answer.isCorrect) {
                            var answ = answeredQuestion.answers.find(a => a.text === answer.text);
                            if (answ.ans === "true") {
                                isCorrect = true;
                            } else {
                                isCorrect = false;
                            }
                        }
                    });

                    if (isCorrect) {
                        correctAnswers++;
                    }
                } else if (question.type === "SHORTANSWER") {
                    var answeredQuestion = newResponse.questions.find(q => q.text === question.text);
                    question.answers.forEach(answer => {
                        if (answer.text === answeredQuestion.answers[0].ans) {
                            correctAnswers++;
                        }
                    });
                } else if (question.type === "TRUEFALSE") {
                    let isTrueCorrect = false;
                    question.answers.forEach(answer => {
                        if (answer.text === "TRUE") {
                            if (answer.isCorrect) {
                                isTrueCorrect = true;
                            } else {
                                isTrueCorrect = false;
                            }
                        }
                    });

                    var answeredQuestion = newResponse.questions.find(q => q.text === question.text);
                    var trueOption = answeredQuestion.answers.find(a => a.text === "TRUE");
                    if (trueOption.ans === "true" && isTrueCorrect) {
                        correctAnswers++;
                    } else if (trueOption.ans === "" && !isTrueCorrect) {
                        correctAnswers++;
                    }
                }
            });

            newResponse.correctAnswers = correctAnswers;

            Response.create(newResponse, (err, Response) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {
                    res.json({ success: true, msg: 'Successfully registered survey response', correctAnswers: correctAnswers, totalQuestions: answeredSurvey.questions.length });
                }
            });
        }
    });
}

module.exports.performUpdate = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = new Survey();

    updatedSurvey._id = id;
    updatedSurvey.userId = req.body.userId;
    updatedSurvey.title = req.body.title;
    updatedSurvey.expiration_dte = req.body.expiration_dte;
    updatedSurvey.questions = req.body.questions;
    updatedSurvey.questions.answers = req.body.questions.answers;

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'Successfully Edited Survey', updatedSurvey: updatedSurvey });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'Successfully Deleted Survey' });
        }
    });
}