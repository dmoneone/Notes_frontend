import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../../redux/notesReducer'
import { GlobalState } from '../../redux/redux_store'
import c from './Notes.module.scss'
import { Note } from './Note/Note'
import AddNoteComponent from './AddNoteForm/AddNoteForm'
import { useRouteMatch } from 'react-router-dom'
import { SpecifiedNote } from './SpecifiedNote/SpecifiedNote'

export const Notes: FC<any> = props => {
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
                    <div>
                        { (notes && !notes.length) &&  <span className={c.status}>No any notes.</span> }
                        { (notes && notes.length) && <ul className={c.notes}> { notes.map(note => {
                            return <Note key={note.id} note={note}/>
                        })} </ul> }
                    </div>
                </>

            }
            {
                id && <SpecifiedNote id={id}/>
            }
        </div>
    )
}
