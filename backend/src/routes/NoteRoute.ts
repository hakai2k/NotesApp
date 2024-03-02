import express from 'express'
import * as NoteController from '../controllers/NoteController'

const NoteRoute = express.Router()

NoteRoute.get('/', NoteController.getNotes)
NoteRoute.get('/:noteID', NoteController.getNote)
NoteRoute.post('/', NoteController.createNote)
NoteRoute.patch('/:noteID', NoteController.updateNote)
NoteRoute.delete('/:noteID', NoteController.deleteNote)

export default NoteRoute