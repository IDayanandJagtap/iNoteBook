const mongoose = require("mongoose");


// Create a schema (like validations for collection)
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})


// Collection in db is generally named after model name (plural form of model name);
module.exports = mongoose.model("user", UserSchema);