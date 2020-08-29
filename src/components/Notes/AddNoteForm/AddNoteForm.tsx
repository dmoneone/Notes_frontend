import React, { useState } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '../../../redux/redux_store'
import { createField, Input } from '../../Form/Form'
import { required, maxLength } from '../../../form_validation_checks/form_validation_checks'
import { addNote } from '../../../redux/notesReducer'

type SubmitingDataType = {
    title: string,
    descr: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const AddNoteForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NameType>(Input,'title','text','title',[required])}
            {createField<NameType>(Input,'descr','text','descr',[required])}
            <button>Add</button>
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