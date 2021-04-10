let mongoose = require('mongoose');

let answerSchema = mongoose.Schema({
    text: String,
    ans: String
});

let questionchema = mongoose.Schema({
    text: String,
    answers: [answerSchema]
});

// create a model class
let responseModel = mongoose.Schema({
    surveyId: String,
    age: String,
    gender: String,
    response_dte: {
        type: Date,
        default: Date.now
    },
    questions: [questionchema],
    correctAnswers: Number,
    totalQuestions: Number
},
{
    collection: "responses"
});

module.exports = mongoose.model('Response', responseModel);