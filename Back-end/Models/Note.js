const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    // Foriegn key in mongoose ... save the user id to fetch the notes only related to that user
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    title: {
        type : String,
        required : true,
    },
    description :{
        type : String,
    },
    tag : {
        type: String,
        default: "General",
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

module.exports = mongoose.model("notes", NoteSchema);