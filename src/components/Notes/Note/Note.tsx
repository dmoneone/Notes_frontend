import React, { FC, useState } from 'react'
import { Note as NoteType } from '../../../api/api'
import { useDispatch } from 'react-redux'
import { removeNote } from '../../../redux/notesReducer'
import UpdateNoteComponent from './UpdateNoteForm/UpdateNoteForm'
import { NavLink } from 'react-router-dom'
import c from '../Notes.module.scss'
import editI from '../../../assets/icons/edit.png'
import removeI from '../../../assets/icons/rmv.png'
import showI from '../../../assets/icons/show.png'

type Props = {
    note: NoteType
}

export const Note: FC<Props> = props => {
    const dispatch = useDispatch()

    const [isEditMode, setEditMode] = useState(false)

    return (
        <>
            <li className='collection-item'>
                { !isEditMode && <span className={c.content}>{props.note.title}</span>}
                { !isEditMode && <span className={c.content}>{props.note.descr}</span>}
                { isEditMode && <span className={c.edit_mode}>Edit mode: </span> }
                { isEditMode && <UpdateNoteComponent 
                    id={props.note.id} 
                    initialValues={{title: props.note.title, descr: props.note.descr}}
                    turnOffEditMode={ () => setEditMode(false) } 
                    /> 
                }
                <div className={c.btn_panel}>
                    <button data-title='remove note' onClick={ () => dispatch(removeNote(props.note.id))}>
                        <img src={removeI} alt="rmv"/>
                    </button>
                    <button data-title='edit note' onClick={ () => isEditMode ? setEditMode(false) : setEditMode(true) }>
                        <img src={editI} alt="edit"/>
                    </button>
                    <NavLink data-title='show note' to={`/notes/${props.note.id}`}>
                        <img src={showI} alt="show"/>
                    </NavLink>
                </div>
            </li>
        </>
    )
}

