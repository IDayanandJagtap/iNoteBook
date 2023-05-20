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
  const host = 'http://localhost:8000';
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  // Get all notes 
  const getNotes = async () => {
    // API call 
    let response = await fetch(`${host}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8',
      }
    })

    response = await response.json()

    setNotes(response);
  }

  // Add a note 
  const addNote = async ({ title, description, tag }) => {
    const data = {
      "title": title,
      "description": description,
      "tag": tag
    }

    // API Call
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8",
      },
      body: JSON.stringify(data)
    })

    response = await response.json()
    setNotes(notes.concat(response));
  }

  // Delete a note 
  const deleteNote = async (id) => {
    // API call 
    let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8",
      }
    })

    await response.json()

    // Delete in local
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Update a note 
  const updateNote = async (id,title,description,tag) => {
    // API call :
    let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWI1ZTRkNDAzNjYzZDhhYThhNjEyIn0sImlhdCI6MTY4MjYxNzgyOH0._qdgaHjOy7K3r5yHSQF-TtaLVWVY_kXpXuZnaQaJKJ8",
      },
      body: JSON.stringify({title, description, tag})
    })

    await response.json()

    // Update the note in local 
    const newNotes = notes.map((note) => {
      if(note._id === id){
        note.title = title
        note.description = description
        note.tag = tag
      }
      return note
    })
    setNotes(newNotes)

  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, updateNote}}>
      {props.children}
    </NoteContext.Provider>

  )
}




export { NoteContext, NoteState }