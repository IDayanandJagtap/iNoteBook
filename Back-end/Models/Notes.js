const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    description :{
        type : String,
    },
    date :{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model("notes", notesSchema);