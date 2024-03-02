import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState(0)

  useEffect( () => {
    async function loadNotes () {
      try{
        const response = await fetch("/notes/")
        const json = await response.json()
        setNotes(json)
      } catch(error){
        console.error(error)
      }
    }
    loadNotes()
  }, [])

  return (
    <>
      <h1>Hi, Front-end!</h1>
      <p>{JSON.stringify(notes)}</p>
    </>
  )
}

export default App
