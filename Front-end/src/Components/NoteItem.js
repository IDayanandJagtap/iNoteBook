import React from 'react'

export default function NoteItem(props) {
    return (
        <div className="card col-md-3 m-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{props.note.title}</h5>
                        <div >
                            <i className="fa-solid fa-trash fa-flip fa-lg mx-3" style={{cursor: "pointer"}}></i>
                            <i className="fa-sharp fa-solid fa-pen-to-square fa-lg" style={{cursor: "pointer"}}></i>
                        </div>

                    </div>
                    <p className="card-text">{props.note.description}</p>
                </div>
        </div>
    )
}