import mongoose, { Schema, InferSchemaType, model } from "mongoose";

const Notes = new Schema ({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    }
}, {timestamps: true})

type NoteSchema = InferSchemaType<typeof Notes>

export default model<NoteSchema>("Notes", Notes)