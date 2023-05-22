import React from 'react'
import AddNote from './AddNote.js'
import ShowNotes from './ShowNotes.js'

export default function Home() {
  // Styles : 
  let notesContStyle = {
    borderRadius : "6px",
    backgroundColor: "#f1f1f1",
  }
  let noteContStyle = {
    backgroundColor: "#f8f9fa",
    borderRadius: "6px", 
    boxShadow:"2px 2px 3px #b7b7b7",
    border: "1px solid #e5e5e5"
  }



  return (
    <div className='my-4'>
      <h2>Add a note : </h2>

      <div className='container p-3 d-flex justify-content-center'>
        <div className="w-75 p-3" style={noteContStyle}>
          <AddNote />
        </div>
      </div>

      <h2 className='mt-5 mb-4'>Your notes : </h2>
      <div className='container p-3' style={notesContStyle}>
        <ShowNotes />
      </div>

    </div>
  )
}
