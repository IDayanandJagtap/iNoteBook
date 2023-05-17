import React from 'react'
import { useContext } from 'react'
import { NoteContext } from '../ContextApi/noteContext'

export default function About() {
  const a = useContext(NoteContext)

  return (
    <div>
      In About {a.state.name}
    </div>
  )
}
