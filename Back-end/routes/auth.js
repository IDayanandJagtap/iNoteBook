const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Express router method to handle routes as different modules
// 2nd argument is of express-validator. It is an array which has validations as its entries
router.post("/", [
    body('email', "Please enter a valid email").isEmail(), 
    body('password', "Password should contain atleast 5 characters").isLength({min:5})
    ],
    async(req, res) => {
        const errors = validationResult(req);
        // If there are errors ..log them
        if(!errors.isEmpty()){
            res.status(400).json( errors);
            return;
        }
        // Check if the user is already present(email)
        try{
            const olduser = await User.findOne({email: req.body.email});
            if(olduser){
                res.status(400).send("User already exists !");
                return
            }

            // If everything is fine Create a user
            const user = await User(req.body);
            await user.save();
            res.send(user);
        }catch(err){
            console.error(err.message);
            res.status(500).send("Something went wrong !");
        }
})


module.exports = router;