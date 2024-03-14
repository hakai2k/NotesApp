import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import * as NotesApi from "../../networks/NotesApi";
import formStyle from "./AddNoteForm.module.css";

function AddNoteForm() {
  const { toast } = useToast();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const createNewNote = async () => {
    const title = titleRef.current?.value || "";
    const text = textRef.current?.value || "";
    if (title == "") {
      toast({
        title: "To add a new note you must enter the title",
        description: "Title not found",
        variant: "destructive",
      });
    } else {
      const data = {
        title: title,
        text: text,
      };
      const response = await NotesApi.createNote(data);
      console.log(response);
    }
  };
  return (
    <form action="" className={formStyle.noteForm}>
      <h1>Add a new note</h1>
      <div>
        <Label>Enter title</Label>
        <Input ref={titleRef} />
      </div>
      <div>
        <Label>Enter text</Label>
        <Textarea ref={textRef} />
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          createNewNote();
        }}
      >
        Add note
      </Button>
    </form>
  );
}

export default AddNoteForm;
