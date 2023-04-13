const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    description :{
        type : String,
    },
    createdAt :{
        type : Date,
        default: Date.now,
        immutable : true
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("notes", NotesSchema);