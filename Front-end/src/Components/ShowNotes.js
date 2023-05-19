import React, {useContext, useEffect} from 'react'
import { NoteContext } from '../ContextApi/noteContext'
import NoteItem from './NoteItem'

export default function ShowNotes(){
    const noteContext = useContext(NoteContext)
    const {notes, getNotes} = noteContext

    useEffect(()=>{
        // Get all notes once on every render
        getNotes()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='row justify-content-md-center'>
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
    )
}