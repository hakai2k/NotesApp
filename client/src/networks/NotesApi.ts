import { NoteModel } from "@/models/NoteModel";

export const queryApi = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
};

export const getNote = async (id: string) => {
  const note = await queryApi(`/notes/${id}`, {
    method: "GET",
  });
  return note.json();
};

export const getAllNotes = async (): Promise<NoteModel[]> => {
  const notes = await queryApi("/notes/", {
    method: "GET",
  });
  return notes.json();
};

interface CreateNoteBody {
  title: string;
  text?: string;
}

export const createNote = async (
  newNote: CreateNoteBody
): Promise<NoteModel> => {
  const createdNewNote = await queryApi("/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
  return createdNewNote.json();
};

interface EditNoteBody {
  _id: string;
  title: string;
  text?: string;
}

export const editNote = async (editNoteBody: EditNoteBody) => {
  const id = editNoteBody._id;
  const editedNote = await queryApi(`/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editNoteBody),
  });
  return editedNote.json();
};

export const deleteNote = async (id: string) => {
  await queryApi(`/notes/${id}`, {
    method: "DELETE",
  });
};
