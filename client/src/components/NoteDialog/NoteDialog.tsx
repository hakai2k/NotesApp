import { useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import * as NotesApi from "../../networks/NotesApi";
import { useToast } from "../ui/use-toast";
import noteDialogStyles from "./NoteDialog.module.css";

interface NoteDialogProps {
  id: string;
  textProp?: string;
  onDelete: () => void;
}

function NoteDialog({ id, textProp, onDelete }: NoteDialogProps) {
  const { toast } = useToast();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleEditEvent = async () => {
    const title = titleRef.current?.value || "";
    if (title === "") {
      toast({
        title: "Title required in order to edit this note",
        description: "Title not found",
        variant: "destructive",
      });
    } else {
      const text = textRef.current?.value || textProp;
      const data = {
        _id: id,
        title: title,
        text: text,
      };
      const response = await NotesApi.editNote(data);
      console.log(response);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogHeader>ID: {id}</DialogHeader>
        </DialogHeader>
        <form action="" className={noteDialogStyles.noteDialogForm}>
          <div>
            <Label>Edit title</Label>
            <Input ref={titleRef} />
          </div>
          <div>
            <Label>Edit text</Label>
            <Textarea ref={textRef} />
          </div>
          <div className={noteDialogStyles.noteDialogFormButton}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleEditEvent();
              }}
            >
              Edit note
            </Button>
            <Button
              variant={"destructive"}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
