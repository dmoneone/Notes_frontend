import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../../redux/redux_store'
import { getSpecifiedNote } from '../../../redux/notesReducer'

type Props = {
    id: string
}

export const SpecifiedNote: FC<Props> = props => {
    const dispatch = useDispatch()
    const currentNote = useSelector((state: GlobalState) => state.notesReducer.currentNote)
    useEffect(() => {
        dispatch(getSpecifiedNote(props.id))
    }, [])

    return (
        <div>
            {currentNote?.title}
            {currentNote?.descr}
        </div>
    )
}