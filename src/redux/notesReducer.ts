import store, { ActionsTypes, GlobalState } from "./redux_store"
import {reset} from 'redux-form';
import { ThunkAction } from "redux-thunk";
import { notes_api, Notes, Note, SpecifiedNote } from "../api/api";
import { stopSubmit } from "redux-form"



const initialState = {
    notes: [] as Array<Note>,
    currentNote: null as Note | null
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const notesReducer = (state: State = initialState, action: ActionTypes): State  => {
    switch(action.type) {
        case 'notesapp/notes/setNotes': {
            return {
                ...state,
                notes: action.notes
            }
        }
        case 'notesapp/notes/setAddedNote': {
            return {
                ...state,
                notes: [...state.notes, action.note]
            }
        }
        case 'notesapp/notes/setRemovedNote': {
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id)
            }
        }
        case 'notesapp/notes/setUpdatedNote': {
            const ind = state.notes.findIndex(note => note.id === action.id)
            const notes = [...state.notes]
            notes[ind].title = action.title
            notes[ind].descr = action.descr

            return {
                ...state,
                notes
            }
        }

        case 'notesapp/notes/setSpecifiedNote': {
            return {
                ...state,
                currentNote: action.note
            }
        }

        default: return state
    }
}

export const actions = {
    setNotes: (notes: Array<Note>) => ({
        type: 'notesapp/notes/setNotes',
        notes
    } as const),
    setAddedNote: (note: Note) => ({
        type: 'notesapp/notes/setAddedNote',
        note
    } as const),
    setRemovedNote: (id: string) => ({
        type: 'notesapp/notes/setRemovedNote',
        id
    } as const),
    setUpdatedNote: (title: string, descr: string, id: string) => ({
        type: 'notesapp/notes/setUpdatedNote',
        title,
        descr,
        id
    } as const),
    setSpecifiedNote: (note: Note) => ({
        type: 'notesapp/notes/setSpecifiedNote',
        note
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes | ReturnType<typeof stopSubmit>>

export const getNotes = (): Thunk => async (dispatch) => {
    try {
        const data = await notes_api.getNotes() as Notes
        dispatch(actions.setNotes(data.notes))
    } catch(err) {
        console.log(err)
    }
}

export const addNote = (title: string, descr: string): Thunk => async (dispatch) => {
    try {
        const data = await notes_api.addNote({title, descr})
        const note = {
            title: title,
            descr: descr,
            date: new Date().toDateString(),
            id: data.id
        }
        dispatch(actions.setAddedNote(note))
        dispatch(reset('addNoteForm'))
        
    } catch(err) {
        console.log(err)
        if(err.response.status === 422) {
            dispatch(stopSubmit('addNoteForm',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
    }
}

export const removeNote = (id: string): Thunk => async (dispatch) => {
    try {
        const data = await notes_api.removeNote(id)
        dispatch(actions.setRemovedNote(id))
    } catch(err) {
        console.log(err)
    }
}

export const updateNote = (title: string, descr: string, id: string): Thunk => async (dispatch) => {
    try {
        const data = await notes_api.updateNote({title, descr}, id)
        dispatch(actions.setUpdatedNote(title, descr, id))
    } catch(err) {
        console.log(err)
        if(err.response.status === 422) {
            dispatch(stopSubmit('updateNoteForm',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
    }
}

export const getSpecifiedNote = (id: string): Thunk => async (dispatch) => {
    try {
        const data = await notes_api.getSpecifiedNode(id) as SpecifiedNote
        dispatch(actions.setSpecifiedNote(data.note))
    } catch(err) {
        console.log(err)
    }
}


export default notesReducer