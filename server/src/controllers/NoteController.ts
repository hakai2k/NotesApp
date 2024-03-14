import mongoose from 'mongoose'
import NoteSchema from '../models/NoteModel'
import createHttpError from 'http-errors'
import { RequestHandler } from 'express'

export const getNotes: RequestHandler = async (req, res, next) => {
    try{
        const notes = await NoteSchema.find().exec()
        res.status(200).json(notes)
    }
    catch(error){
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const id = req.params.noteID
    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid note ID")
        }
        const note = await NoteSchema.findById(id).exec()
        if (!note){
            throw createHttpError(404, "Note not found :(")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

interface CreateNoteBody{
    title?: string,
    text?: string
}

export const createNote: RequestHandler <unknown, unknown, CreateNoteBody, unknown> = async(req, res, next) => {
    const title = req.body.title
    try {
        if (!title){
            throw createHttpError(400, "Note must have title")
        }
        const text = req.body.text
        const newNote = await NoteSchema.create({
            title: title,
            text: text
        })
        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}

interface UpdateNoteParam {
    noteID: string
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler <UpdateNoteParam, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const id = req.params.noteID
    const title = req.body.title
    try{
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Note ID. Cannot edit Note")
        }
        if (!title){
            throw createHttpError(400, "Note requires title. Cannot edit note")
        }
        const text = req.body.text
        const updatedNote = await NoteSchema.findByIdAndUpdate(id, {
            title: title,
            text: text
        })
        if (!updatedNote){
            throw createHttpError(404, "Cannot update note that does not exist")
        }
        res.status(200).json(updatedNote)
    } catch(error){
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const id = req.params.noteID
    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid note ID. Cannot delete note")
        }
        const deletedNote = await NoteSchema.findByIdAndDelete(id)
        if (!deletedNote){
            throw createHttpError(404, "Cannot delete note that does not exist")
        }
        res.status(200).json(deletedNote)
    } catch (error) {
        next(error)
    }
}