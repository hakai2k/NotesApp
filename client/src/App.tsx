import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import NoteCard from "./components/NoteCard/NoteCard";
import styles from "./styles/app.module.css";
import { NoteModel } from "./models/NoteModel";
import * as NotesApi from "./networks/NotesApi";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  useEffect(() => {
    const getNotes = async () => {
      const response = await NotesApi.getAllNotes();
      setNotes(response);
    };
    getNotes();
  }, []);
  return (
    <>
      <Navbar />
      <main className={styles.notesContainer}>
        <div className={styles.noteCardContainer}>
          {notes.map((note) => (
            <NoteCard note={note} key={note._id} />
          ))}
        </div>
        <div className={styles.addNoteContainer}>
          <AddNoteForm />
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default App;
