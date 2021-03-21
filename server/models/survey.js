let mongoose = require('mongoose');

let answerSchema = mongoose.Schema({
    isCorrect: Boolean,
    text: String
});

let questionchema = mongoose.Schema({
    type: String,
    text: String,
    answers: [answerSchema]
});

// create a model class
let surveyModel = mongoose.Schema({
    title: String,
    userId: {
        type: String,
        default: 'admin'
    },
    created_dte: {
        type: Date,
        default: Date.now
    },
    updated_dte: {
        type: Date,
        default: Date.now
    },
    expiration_dte: {
        type: Date,
        default: Date.now
    },
    questions: [questionchema] 
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);