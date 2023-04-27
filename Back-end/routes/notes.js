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



module.exports = router;