import React, {useContext} from 'react'
import { NoteContext } from '../ContextApi/noteContext'

export default function NoteItem({note, editNote}) {
    const noteContext = useContext(NoteContext)
    const {deleteNote} = noteContext

    const {_id, title, description} = note

    return (
        <>
        <div className="card col-md-3 m-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{title}</h5>
                        <div >
                            <i className="fa-solid fa-trash fa-flip fa-lg mx-3" onClick={() => deleteNote(_id)} style={{cursor: "pointer"}}></i>
                            <i className="fa-sharp fa-solid fa-pen-to-square fa-lg" onClick={() => editNote(note)}  style={{cursor: "pointer"}}></i>
                        </div>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
        </div>
        </>
    )
}