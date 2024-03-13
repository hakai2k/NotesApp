import { NoteModel } from "@/models/NoteModel";
import styles from "./Note.module.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/util/FormatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { deleteNoteAPI, editNoteAPI } from "@/network/Notes_API";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRef } from "react";
import { toast } from "../ui/use-toast";

interface NotesProps {
  note: NoteModel;
}

const Note = ({ note }: NotesProps) => {
  const { title, text, createdAt, updatedAt } = note;
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  async function editNote() {
    const title = titleRef.current?.value || "";
    const text = textRef.current?.value || "";
    if (title == "") {
      toast({
        title: "Unable to edit note",
        description: "Please enter the title to edit this note.",
        variant: "destructive",
      });
    } else {
      const noteBody = {
        _id: note._id,
        title: title,
        text: text,
      };
      console.log(noteBody);
      editNoteAPI(noteBody);
    }
  }

  async function deleteNote(id: string) {
    deleteNoteAPI(id);
  }

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated At: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created At: " + formatDate(createdAt);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardText}>
            <p>{text}</p>
          </CardContent>
          <CardFooter>
            <p>{createdUpdatedText}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogDescription>Note ID: {note._id}</DialogDescription>
        </DialogHeader>
        <div className={styles.formContainer}>
          <form className={styles.notesForm}>
            <div className={styles.noteTitle}>
              <Label htmlFor="title">Enter a title</Label>
              <Input
                name="title"
                type="text"
                placeholder="Enter a title"
                id="title"
                ref={titleRef}
              />
            </div>
            <div className={styles.noteText}>
              <Label htmlFor="text">Enter your note text</Label>
              <Textarea
                name="text"
                placeholder="Enter ur text"
                id="text"
                ref={textRef}
              />
            </div>
            <div className={styles.noteButtons}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  editNote();
                }}
              >
                Edit
              </Button>
              <Button
                variant={"destructive"}
                onClick={(e) => {
                  e.preventDefault();
                  deleteNote(note._id);
                }}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Note;
