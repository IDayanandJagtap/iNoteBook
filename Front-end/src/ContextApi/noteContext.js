// Context api is used to access a particular variable(usually a state var) from any component no matter the depth of the component.
// It is done by wrapping all the components that requires a variable(state) into the context state(check app.js).

// Remember while using the context api we use useContext(NoteContext) because it is the one that provides return value.
// For return value context api finds the closest {context.Provider} while providing some return value. 


import { createContext } from "react";
import { useState } from 'react';

// Create a context
const NoteContext = createContext();


// Create a context provider
const NoteState = (props) => {
  const host = 'http://localhost:8000'
  const [notes, setNotes] = useState([])

  // During each render the whole response array gets concatenated with the notes array while results in duplicate elements
  

  // Get all notes 
  const getNotes = async () => {
    let response = await fetch(`${host}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8',
      }
    })

    response = await response.json()

    setNotes([])
    setNotes(notes.concat(response));
  }

  // Add a note 
  const addNote = async ({ title, description, tag }) => {
    const data = {
      "title" : title,
      "description" : description,
      "tag" : tag
    }

    let response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8",
      },
      body : JSON.stringify(data)
    })

    response = await response.json()
    console.log(response)
    setNotes(notes.concat(response));
  }

  // Delete a note 
  const deleteNote = async(id) => {
    let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8",
      }
    })

    response = await response.json()
    console.log(response)
  
    const newNotes = notes.filter((note)=> {return note._id !== id})
    setNotes(newNotes) 
  }

  // Update a note 
  const updateNote = (id) => {

  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>

  )
}




export { NoteContext, NoteState }