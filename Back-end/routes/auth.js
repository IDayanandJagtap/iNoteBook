const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

// Put this in .env file 
const JWT_SECRET_KEY = "JWT_SECRET_KEY"


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
            // But first hash the password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                name: req.body.name,
                email : req.body.email,
                password: secPass
            });
            
            // JWT token
            let data = {
                user : {
                    id : user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET_KEY)
            res.send(token);

        }catch(err){
            console.error(err.message);
            res.status(500).send("Something went wrong !");
        }
});


// Creating a route for login
router.post("/login", [
    body('email').isEmail(),
    body("password").isLength({min : 5})
    ],
    async (req,res)=>{
        // check errors from express-validator and return if present
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send("Please enter valid credentials !");
            return;
        }

        try{
            const {email, password} = req.body;

            // Find user with the entered email
            const user = await User.findOne({email : email});

            // Compare the password with the stored hash ... parameters --->(current password (string), hashed string(from db)); 
            const passwordCompare = await bcrypt.compare(password, user.password);

            // It returns true or false so check.
            if(!passwordCompare)
                res.status(400).send("Please enter valid login credentials !");

            // Jwt token 
            let data = {
                user : {
                    id : user.id
                }
            }

            let token = jwt.sign(data, JWT_SECRET_KEY);
            res.send(token);

        }catch(err){
            console.log(err.message);
            res.status(500).send("Internal server error");
        }
    }


)


module.exports = router;