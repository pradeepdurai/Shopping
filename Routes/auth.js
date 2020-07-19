var express = require("express");
var router = express.Router();
const { body, validationResult } = require('express-validator');

var { signout, signup, signin } = require("../Controllers/auth");

router.get("/signout", signout);

router.post("/signup",
    [
        body("name").isAlpha().withMessage("Name should be in letters"),
        body("lastname").isAlpha().withMessage("Lastname should be in letters"),
        body("email").isEmail().withMessage("Enter Valid Email"),
        //body("password").isEmpty().withMessage("Password Field Is Required")
    ],
    signup);

router.post("/signin", 
[
    body("email").isEmail().withMessage("Enter Valid Email")
]
,signin)


module.exports = router;    