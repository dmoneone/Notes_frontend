import axios from 'axios'

const a = axios.create({
    baseURL: 'http://localhost:3005/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export type Note = {
    title: string,
    id: string,
    date: string,
    descr: string
}

export type Notes = {
    notes: Array<Note> 
}

export type SpecifiedNote = { note: Note }

export const notes_api = {
    getNotes() {
        return a.get<Notes>('/notes').then(res => res.data)
    },
    getSpecifiedNode<SpecifiedNote>(id: string) {
        return a.get(`/notes/${id}`).then(res => res.data)
    },
    addNote(note: any) {
        return a.post('/notes', note).then(res => res.data)
    },
    removeNote(id: string) {
        return a.delete(`/notes/${id}`).then(res => res.data)
    },
    updateNote(note: any, id: string) {
        a.put(`/notes/${id}`, note).then(res => res.data)
    }
}

