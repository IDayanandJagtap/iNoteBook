import React, {useContext} from 'react'
import { NoteContext } from '../ContextApi/noteContext'

export default function ShowNotes(){
    const noteContext = useContext(NoteContext)
    const {notes, setNotes} = noteContext

    console.log(notes)

    return (
        <div>
            {notes.map((note)=>{
                return note.title
            })}
        </div>
    )
}