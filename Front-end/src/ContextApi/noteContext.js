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
    const notesInitial = [
        {
          "_id": "646579d46d50cf4674f354fd",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note",
          "description": "This is my new note ",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:24.432Z",
          "updatedAt": "2023-05-18T01:05:24.432Z",
          "__v": 0
        },
        {
          "_id": "646579e36d50cf4674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "646579e36d503cf4674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "6465793e36d50cf4674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "646579e36d50cf42674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "646579e536d50cf4674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "646579e36d3250cf4674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "6463579e36d50cf4674f354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new alkfjld;afdkl tlek lk lakdj la l kjdk jalk lkdjfkldj kljakld ldk l note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        },
        {
          "_id": "646579e36d50cf4674f34354ff",
          "user": "644ab5e4d403663d8aa8a612",
          "title": "My new note 2",
          "description": "This is my another new note",
          "tag": "Personal",
          "createdAt": "2023-05-18T01:05:39.157Z",
          "updatedAt": "2023-05-18T01:05:39.157Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

      // Add a note 
      const addNote = ({title, description, tag}) =>{
          const note = {
            "_id": "646579e36d50cf4674f34354ff" + title.slice(0,4),
            "user": "644ab5e4d403663d8aa8a612",
            "title": title,
            "description": description,
            "tag": tag,
            "createdAt": "2023-05-18T01:05:39.157Z",
            "updatedAt": "2023-05-18T01:05:39.157Z",
            "__v": 0
          }

          setNotes(notes.concat(note));
      }

      // Delete a note 
      const deleteNote = (id) => {

      }

      // Update a note 
      const updateNote = (id) => {

      }

      return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>

    )
}




export { NoteContext, NoteState }