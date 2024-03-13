import { useEffect, useState } from "react";
import style from "./styles/app.module.css";
import Note from "./components/Note/Note";
import * as NotesApi from "./network/Notes_API";
import { NoteModel } from "./models/NoteModel";
import AddNote from "./components/AddNote/AddNote";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <>
      <main className={style.main}>
        <div className={style.cardContainer}>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
        <AddNote />
        <Toaster />
      </main>
    </>
  );
}

export default App;
