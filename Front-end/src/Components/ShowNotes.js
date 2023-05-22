import React, { useContext, useEffect, useRef, useState } from 'react'
import { NoteContext } from '../ContextApi/noteContext'
import NoteItem from './NoteItem'

export default function ShowNotes({showAlert}) {
    const noteContext = useContext(NoteContext)
    const { notes, getNotes, updateNote } = noteContext

    const openModal = useRef(null);
    const closeModal = useRef(null);
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    // Get all notes once on every render
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const handleOnChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    const editNote = (currentNote) => {
        openModal.current.click()
        setNote({id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag})
    }

    const updateChanges = async (e) =>{
        e.preventDefault();    
        const res = await updateNote(note.id, note.title, note.description, note.tag)
        closeModal.current.click()
        
        if(res.status === 200)
            showAlert({msg: "Note updated successfully", type : "success"})
        else
            showAlert({msg: "Something went wrong !", type : "danger"})
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button hidden type="button" ref={openModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title : </label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleOnChange}  minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description : </label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange}  minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag : </label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeModal} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateChanges}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Show note items */}
            <div className='row justify-content-md-center'>
                {notes.length === 0 && "No notes to display "}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} editNote={editNote} showAlert={showAlert}/>
                })}
            </div>
        </>
    )
}