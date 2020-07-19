
const User = require("../Models/user");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signout = (req, res) => {
    res.json({
        message: "Success"
    });
}

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: err
            });
        }
        res.json({
            message: "Success"
        })
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {

        if (err ||!user) {
            return res.status(400).json({
                error: "USER email does not exist"
            })
        }
        if (user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECERT)

        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to front end

        const { _id, name, email, role } = user;

        return res.json({ token, user: { _id, name, email, role } })
    });



}
