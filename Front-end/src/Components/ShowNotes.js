import React, {useContext} from 'react'
import { NoteContext } from '../ContextApi/noteContext'
import NoteItem from './NoteItem'

export default function ShowNotes(){
    const noteContext = useContext(NoteContext)
    const {notes} = noteContext

    console.log(notes)

    return (
        <div className='row justify-content-md-center'>
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
    )
}