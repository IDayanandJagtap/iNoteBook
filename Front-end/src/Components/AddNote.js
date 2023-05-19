import React, { useContext, useState } from 'react'
import { NoteContext } from '../ContextApi/noteContext'

export default function AddNote() {
    const [note, setNote] = useState({title: "", description: "", tag: "Default"})
    const noteContext = useContext(NoteContext);
    const {addNote} = noteContext

    const handleOnChange = (e) => {
        // Retain the previous object and add or overwrite the following fields
        setNote({...note, [e.target.name] : e.target.value})

    }
    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note)
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleOnChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Password</label>
                <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
        </form>
    )
}