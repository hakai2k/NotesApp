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
  const [noteLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setshowNotesLoadingError] = useState(false);
  useEffect(() => {
    const getNotes = async () => {
      try {
        setshowNotesLoadingError(false);
        setNotesLoading(true);
        const response = await NotesApi.getAllNotes();
        setNotes(response);
      } catch (error) {
        console.error(error);
        alert(error);
        setshowNotesLoadingError(true);
        setNotesLoading(false);
      } finally {
        setNotesLoading(false);
      }
    };
    getNotes();
  }, []);

  const addNewNote = async (newNote: NoteModel) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = async (noteId: string) => {
    await NotesApi.deleteNote(noteId);
    setNotes(notes.filter((note) => note._id !== noteId));
  };

  const notesCardContainer = (
    <div className={styles.noteCardContainer}>
      {notes.map((note) => (
        <NoteCard note={note} key={note._id} onDelete={deleteNote} />
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className={styles.notesContainer}>
        {noteLoading && "loading"}
        {showNotesLoadingError && <p>Something went wrong!</p>}
        {!noteLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? (
              notesCardContainer
            ) : (
              <p>You dont have any notes</p>
            )}
          </>
        )}
        <div className={styles.addNoteContainer}>
          <AddNoteForm addNewNote={addNewNote} />
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default App;
