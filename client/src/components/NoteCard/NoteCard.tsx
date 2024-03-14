import { NoteModel } from "@/models/NoteModel";
import NoteDialog from "../NoteDialog/NoteDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/utils/FormatDate";
import noteStyles from "./NoteCard.module.css";

interface NoteCardProp {
  note: NoteModel;
}

function NoteCard({ note }: NoteCardProp) {
  let noteDate: string;
  if (note.updatedAt > note.createdAt) {
    noteDate = "Updated At: " + formatDate(note.updatedAt);
  } else {
    noteDate = "Created At: " + formatDate(note.createdAt);
  }
  return (
    <Card className={noteStyles.noteContainer}>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>{note.text}</CardContent>
      <CardFooter className={noteStyles.noteFooter}>
        <p>{noteDate}</p>
        <NoteDialog id={note._id} textProp={note.text} />
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
