import React, { FC, useState } from 'react'
import { Note as NoteType } from '../../../api/api'
import { useDispatch } from 'react-redux'
import { removeNote } from '../../../redux/notesReducer'
import UpdateNoteComponent from './UpdateNoteForm/UpdateNoteForm'
import { NavLink } from 'react-router-dom'

type Props = {
    note: NoteType
}

export const Note: FC<Props> = props => {
    const dispatch = useDispatch()

    const [isEditMode, setEditMode] = useState(false)

    return (
        <>
            <li>
                { !isEditMode && <span>{props.note.title}</span>}
                { isEditMode && <UpdateNoteComponent 
                    id={props.note.id} 
                    initialValues={{title: props.note.title, descr: props.note.descr}}
                    turnOffEditMode={ () => setEditMode(false) } 
                    /> 
                }
                <span>{props.note.date}</span>
                <button onClick={ () => dispatch(removeNote(props.note.id))}>X</button>
                <button onClick={ () => isEditMode ? setEditMode(false) : setEditMode(true) }>edit</button>

                <NavLink to={`/notes/${props.note.id}`}>open</NavLink>
            </li>
        </>
    )
}

