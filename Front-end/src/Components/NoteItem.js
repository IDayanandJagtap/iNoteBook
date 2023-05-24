import React, {useContext} from 'react'
import { NoteContext } from '../ContextApi/noteContext'

export default function NoteItem({note, editNote, showAlert}) {
    const noteContext = useContext(NoteContext)
    const {deleteNote} = noteContext

    let {_id, title, description,tag, createdAt, updatedAt} = note

    // Capitalize the tag

    if(tag) tag = tag[0].toUpperCase() + tag.slice(1)
    // Format dates
    createdAt = new Date(createdAt).toLocaleDateString("en-US")
    updatedAt = new Date(updatedAt).toLocaleDateString("en-US")

    

    // To select color of the badge randomly 
    const colors = ["primary", "secondary", "success", "danger", "info", "warning"]
    let randNum = (Math.floor(Math.random() * colors.length)) 
    const badgeColor = colors[randNum]

    const removeNote = async(id) => {
        const res = await deleteNote(id)
        if(res.status === 200)
            showAlert({msg: "Note deleted successfully !", type: "success"})
        else 
            showAlert({msg: "Something went wrong !",  type: "danger"})

    }
    return (
        <>
        <div className="card col-md-3 m-3 position-relative">
                <div className="card-body">
                    <span className={"position-absolute translate-middle badge rounded-pill bg-"+badgeColor} style={{top:"2px", left: "15px"}}>{tag}</span>
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{title}</h5>
                        <div >
                            <i className="fa-solid fa-trash fa-flip fa-lg mx-3" onClick={() => removeNote(_id)} style={{cursor: "pointer"}}></i>
                            <i className="fa-sharp fa-solid fa-pen-to-square fa-lg" onClick={() => editNote(note)}  style={{cursor: "pointer"}}></i>
                        </div>
                    </div>
                    <hr></hr>
                    <p className="card-text">{description}</p>
                    <hr /> 
                    <div className='d-flex justify-content-between align-items-center' style={{fontSize: ".8rem"}}>
                        <p>Created :  <br></br> {createdAt}</p>
                        <p>Updated :  <br></br> {updatedAt}</p>
                    </div>
                </div>
        </div>
        </>
    )
}