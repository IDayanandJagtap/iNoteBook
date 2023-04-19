const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


router.post("/", [
    body('email', "Please enter a valid email").isEmail(), 
    body('password', "Password should contain atleast 5 characters").isLength({min:5})
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.send( errors);
            return;
        }

        const user = User(req.body);
        user.save();
        res.send(user);
})


module.exports = router;