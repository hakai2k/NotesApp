import { NoteModel } from "@/models/NoteModel"
import styles from './Note.module.css'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"

interface NotesProps {
    note: NoteModel
}

const Note = ({note}: NotesProps) => {

    const {title, text, createdAt, updatedAt} = note

    return (
            <Card className={styles.card}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className={styles.cardText}>
                    <p >{text}</p>
                </CardContent>
                <CardFooter>
                    <p>Created: {createdAt}</p>
                    <p>Updated: {updatedAt}</p>
                </CardFooter>
            </Card>       
    )
}

export default Note