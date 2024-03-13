import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import style from "./AddNote.module.css";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";
import { createNote } from "@/network/Notes_API";

const AddNote = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const titleValue = titleRef.current?.value || "";
    const textValue = textRef.current?.value || "";
    if (titleValue == "") {
      console.log("Title needs value");
      toast({
        variant: "destructive",
        title: "Please enter a title for the new note.",
        description: "Title required!",
      });
    } else {
      const data = {
        title: titleValue,
        text: textValue,
      };
      const response = createNote(data);
      console.log(response);
    }
  };

  return (
    <form action="" className={style.form} id="create-note">
      <h1 className={style.formHeader}>Enter a new note</h1>
      <div>
        <Label>Enter title</Label>
        <Input type="text" id="new-title" ref={titleRef} />
      </div>
      <div>
        <Label>Enter text</Label>
        <Textarea id="new-text" ref={textRef} />
      </div>
      <Button onClick={handleClick}>Add note</Button>
    </form>
  );
};

export default AddNote;
