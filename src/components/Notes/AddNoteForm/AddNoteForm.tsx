import React, { useState } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '../../../redux/redux_store'
import { createField, Input } from '../../Form/Form'
import { required, maxLength, minLength } from '../../../form_validation_checks/form_validation_checks'
import { addNote } from '../../../redux/notesReducer'
import c from './AddNoteForm.module.scss'

const maxLenTitle = maxLength(20)
const minLenTitle = minLength(2)

const maxLenDescr = maxLength(300)
const minLenDescr = minLength(2)

type SubmitingDataType = {
    title: string,
    descr: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const AddNoteForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit} className={c.addNewPostForm}>
            <span className={c.title}>Create a note!</span>
            {createField<NameType>(Input,'title','text','title',[required, maxLenTitle, minLenTitle], 'input-field')}
            {createField<NameType>(Input,'descr','text','descr',[required, maxLenDescr, minLenDescr])}
            {props.error && <span className={c.error}>{props.error}</span>}
            <button className='waves-effect waves-light btn'>Create</button>
        </form>
    )
}

const AddNoteReduxForm = reduxForm<SubmitingDataType, {}>({
    form: 'addNoteForm'
})(AddNoteForm)


type Props = {

}

const AddNoteComponent: React.FC<Props> = props => {
    const dispatch = useDispatch()

    const submit = (data: SubmitingDataType) => {
        dispatch(addNote(data.title, data.descr))
    }            
    
    return (
        <div>
            <AddNoteReduxForm onSubmit={submit} />
        </div>   
    )
}

export default AddNoteComponent