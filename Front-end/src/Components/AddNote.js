import React, { useContext, useState } from 'react'
import { NoteContext } from '../ContextApi/noteContext'

export default function AddNote() {
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const noteContext = useContext(NoteContext);
    const {addNote} = noteContext

    const handleOnChange = (e) => {
        // Retain the previous object and add or overwrite the following fields
        setNote({...note, [e.target.name] : e.target.value})

    }
    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note)
        setNote({title:"", description: "", tag:""})
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title : </label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleOnChange} value={note.title} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description : </label>
                <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange} value={note.description} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag : </label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange} value={note.tag} />
            </div>
            <button disabled={note.title.length < 5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
        </form>
    )
}