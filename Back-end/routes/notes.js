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
            let savedNote = await note.save();
            res.json(savedNote);

        }catch(err){
            console.error(err.message);
            res.status(500).send("Something went wrong !");
        }
})


//! Route 3 : Update existing note      --- login required 
// Put request is made while updating
router.put("/updatenote/:id", fetchUser, async(req, res) =>{

    try{
            const {title, description, tag} = req.body;

        // Dont use new keyword while creating a object here because it will assign a new _id value to the object which will give an error of immuatable field !!!
        // In fact don't use new Note while creating a object ... just simply create a normal object !
        let updatedAt = new Date().getTime();
        let updatedNote = {title, description, tag, updatedAt};

        const noteId = req.params.id;

        const note = await Note.findById(noteId)

        if(!note){return res.status(400).send("Error : Note not found !")};

        if(note.user.toString() !== req.user.id){return res.status(401).send("Not authorised")};


        updatedNote = await Note.findByIdAndUpdate(noteId, {$set: updatedNote}, {new:true});

        res.json(updatedNote);
    }catch(err){
        return res.status(500).send("Internal server error !");
    }
    


    
    
})



module.exports = router;

/*
{
    "user": "644ab5e4d403663d8aa8a612",
    "title": "My new tony note",
    "description": "This is my new note ",
    "tag": "Personal",
    "_id": "644ab608d403663d8aa8a616",
    "createdAt": "2023-04-27T17:51:04.450Z",
    "updatedAt": "2023-04-27T17:51:04.450Z",
    "__v": 0
  }

  */