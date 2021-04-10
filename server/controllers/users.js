let express = require('express');
let router = express.Router();
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.getUserByUsername = (req, res, next) => {

    let username = req.params.username;

    User.find({ username: username }, (err, result) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            res.json(result[0]);
        }
    });
}

module.exports.performUpdate = (req, res, next) => {
    let username = req.params.username

    let updatedUser = new User();

    updatedUser._id = req.body._id;
    updatedUser.email = req.body.email;
    updatedUser.phone = req.body.phone;
    updatedUser.address = req.body.address;
    updatedUser.name = req.body.name;
    updatedUser.username = username;

    User.updateOne({ _id: req.body._id }, updatedUser, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'User updated successfully', updatedUser: updatedUser });
        }
    });
}