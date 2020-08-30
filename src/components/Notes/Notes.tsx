import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../../redux/notesReducer'
import { GlobalState } from '../../redux/redux_store'
import c from './Notes.module.scss'
import { Note } from './Note/Note'
import AddNoteComponent from './AddNoteForm/AddNoteForm'
import { useRouteMatch } from 'react-router-dom'
import { SpecifiedNote } from './SpecifiedNote/SpecifiedNote'

type Props = {
    t: any
}

export const Notes: FC<Props> = props => {
    const dispatch = useDispatch()
    const notes = useSelector((state: GlobalState) => state.notesReducer.notes) 
    useEffect(() => {
        dispatch(getNotes())
    }, [])
    const urlData = useRouteMatch()
    //@ts-ignore
    const id = urlData.params.id
    return (
        <div>
            {
                !id && <>
                    <AddNoteComponent />
                    <span className={c.yourNotes}> { props.t('notes.notesTitle') } </span>
                    <div>
                        { (notes && !notes.length) &&  <span className={c.status}> {props.t('notes.emptyNotes')} </span> }
                        { (notes && notes.length) ? <ul className={c.notes + ' collection'}> { notes.map(note => {
                            return <Note key={note.id} note={note} t={props.t} />
                        })} </ul> : null }
                    </div>
                </>

            }
            {
                id && <SpecifiedNote id={id}/>
            }
        </div>
    )
}
