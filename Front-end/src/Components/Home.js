import React from 'react'
import AddNote from './AddNote.js'
import ShowNotes from './ShowNotes.js'

export default function Home() {
  // Styles : 
  let contStyle = {
    borderRadius : "6px",
    backgroundColor: "#f1f1f1",
  }
  let innerContStyle = {
    backgroundColor: "#d7d7d7",
    borderRadius: "3px", 
    boxShadow:"2px 2px 3px #b7b7b7"
  }



  return (
    <div className='my-4'>
      <h2>Add a note : </h2>

      <div className='container p-3 d-flex justify-content-center' style={contStyle}>
        <div className="w-75 p-3" style={innerContStyle}>
          <AddNote />
        </div>
      </div>

      <h2 className='mt-5 mb-4'>Your notes : </h2>
      <div className='container p-3' style={contStyle}>
        <ShowNotes />
      </div>

    </div>
  )
}
