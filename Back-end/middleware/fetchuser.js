// We know about the chained functions of express route.
// We will add this module/function as a middleware. 
// We do this because we will require the data of user several times whenever, wherever login credentials are required so it is better to create a module and use it.

const jwt = require("jsonwebtoken");
const dotenv=  require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const fetchUser = (req,res,next) =>{
    const token = req.header("auth-token");
    if(!token){
        res.status(500).send({success: "False" , error : "Please enter a valid token"});
        return ;
    }

    try{
        const data =  jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    }catch(err){
        console.log(err.message);
        res.status(500).send({success: "False" , error : "Internal server error in middle"});
    }
        
    
    
}

module.exports = fetchUser;
