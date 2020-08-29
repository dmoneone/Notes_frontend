import React, { useState } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '../../../../redux/redux_store'
import { createField, Input } from '../../../Form/Form'
import { required, maxLength, minLength } from '../../../../form_validation_checks/form_validation_checks'
import { addNote, updateNote } from '../../../../redux/notesReducer'
import c from './UpdateNoteForm.module.scss'
import saveI from '../../../../assets/icons/save.png'

const maxLenTitle = maxLength(20)
const minLenTitle = minLength(2)

const maxLenDescr = maxLength(300)
const minLenDescr = minLength(2)

type SubmitingDataType = {
    title: string,
    descr: string
}

type OwnProps = {
    initialValues: any
}

type NameType = Extract<keyof SubmitingDataType,string>

const UpdateNoteForm: React.FC<InjectedFormProps<SubmitingDataType, OwnProps> & OwnProps> = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NameType>(Input,'title','text','title',[required, maxLenTitle, minLenTitle])}
            {createField<NameType>(Input,'descr','text','descr',[required, maxLenDescr, minLenDescr])}
            {props.error && <span className={c.error}>{props.error}</span>}
            <button data-title="save changes" className={c.btn}><img src={saveI} alt="save"/></button>
        </form>
    )
}

const UpdateNoteReduxForm = reduxForm<SubmitingDataType, OwnProps>({
    form: 'updateNoteForm'
})(UpdateNoteForm)


type Props = {
    id: string,
    initialValues: any,
    turnOffEditMode: () => void
}

const UpdateNoteComponent: React.FC<Props> = props => {
    const dispatch = useDispatch()

    const submit = async (data: SubmitingDataType) => {
        await dispatch(updateNote(data.title, data.descr, props.id))
        props.turnOffEditMode()
    }            
    
    return (
        <div>
            <UpdateNoteReduxForm onSubmit={submit} initialValues={props.initialValues} />
        </div>   
    )
}

export default UpdateNoteComponent