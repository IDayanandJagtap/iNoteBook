const express= require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const {body, validationResult} = require("express-validator")

//! Route 1 : Fetch all notes   --- login required

router.get("/", fetchUser, async (req, res)=>{
    
    try{
        const notes = await Note.find({user : req.user.id});
        res.json(notes);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Something went wrong !");
    }
})


//! Route 2 : Add new note    --- login required

router.post("/addnote", fetchUser, [
        body("title", "Enter a valid title").isLength({min : 3}),
        body("description", "Enter a valid description").isLength({min : 5}),
    ], 
    async(req, res)=>{
        // Return if there are validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send("Bad request !");
            return;
        }

        try{
            const {title, description, tag } = req.body;
            
            const note = new Note({
                title, description, tag, user : req.user.id,
            }) ;
            const savedNote = await note.save();
            res.status(200).send({status: 200, data: savedNote});

        }catch(err){
            console.error(err.message);
            res.status(500).send("Something went wrong !");
        }
})


//! Route 3 : Update existing note      --- login required 
// Put request is made while updating
router.put("/updatenote/:id", fetchUser, async(req, res) =>{
    const {title, description, tag} = req.body;
    try{

        // Dont use new keyword while creating a object here because it will assign a new _id value to the object which will give an error of immuatable field !!!
        // In fact don't use new Note while creating a object ... just simply create a normal object !
        let updatedAt = new Date().getTime();
        let updatedNote = {title, description, tag, updatedAt};

        const noteId = req.params.id;

        const note = await Note.findById(noteId)

        if(!note){return res.status(400).send("Error : Note not found !")};

        // Check if the user is updating his own note and not others
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not authorised")};

        updatedNote = await Note.findByIdAndUpdate(noteId, {$set: updatedNote}, {new:true});

        res.status(200).send({status: 200, data: updatedNote});
    }catch(err){
        return res.status(500).send("Internal server error !");
    }   
})


//! Route 4 : Delete a note      --- login required 
// delete request is made while deleting
router.delete("/deletenote/:id", fetchUser, async(req, res) =>{

    try{
        const noteId = req.params.id;

        let note = await Note.findById(noteId)

        if(!note){return res.status(400).send("Error : Note not found !")};

        if(note.user.toString() !== req.user.id){return res.status(401).send("Not authorised")};


        note = await Note.findByIdAndDelete(noteId);

        res.status(200).send({status: 200, data: note});

    }catch(err){
        return res.status(500).send("Internal server error !");
    }   
})



module.exports = router;
