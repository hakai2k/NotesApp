import { NoteModel } from "@/models/NoteModel";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<NoteModel[]> {
  const response = await fetchData("/notes/");
  return response.json();
}

interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<NoteModel> {
  const response = await fetchData("/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNoteAPI(id: string): Promise<NoteModel> {
  const repsonse = await fetchData(`/notes/${id}`, {
    method: "DELETE",
  });
  return repsonse.json();
}

interface NoteEditBody {
  _id: string;
  title: string;
  text?: string;
}

export async function editNoteAPI(note: NoteEditBody) {
  const id = note._id;
  const response = await fetchData(`/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}
