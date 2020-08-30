import React, { useState } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '../../../redux/redux_store'
import { createField, Input } from '../../Form/Form'
import { required, maxLength, minLength } from '../../../form_validation_checks/form_validation_checks'
import { addNote } from '../../../redux/notesReducer'
import c from './AddNoteForm.module.scss'
import { withNamespaces } from 'react-i18next'

const maxLenTitle = maxLength(20)
const minLenTitle = minLength(2)

const maxLenDescr = maxLength(300)
const minLenDescr = minLength(2)

type SubmitingDataType = {
    title: string,
    descr: string
}

type NameType = Extract<keyof SubmitingDataType,string>

type OwnProps = {
    t: any
}

const AddNoteForm: React.FC<InjectedFormProps<SubmitingDataType, OwnProps> & OwnProps> = (props) => {
    const { t } = props
    return (
        <form onSubmit={props.handleSubmit} className={c.addNewPostForm}>
            <span className={c.title}>{ t('addingNewNoteForm.mainTitle') }</span>
            {createField<NameType>(Input,'title','text', t('addingNewNoteForm.fieldTitle'),[required, maxLenTitle, minLenTitle], 'input-field')}
            {createField<NameType>(Input,'descr','text', t('addingNewNoteForm.fieldDescr'),[required, maxLenDescr, minLenDescr])}
            {props.error && <span className={c.error}>{props.error}</span>}
            <button className='waves-effect waves-light btn'>{ t('addingNewNoteForm.btnContent')}</button>
        </form>
    )
}

let AddNoteReduxForm = reduxForm<SubmitingDataType, OwnProps>({
    form: 'addNoteForm'
})(AddNoteForm)


const AddNoteComponent: React.FC<any> = props => {
    const dispatch = useDispatch()

    const submit = (data: SubmitingDataType) => {
        dispatch(addNote(data.title, data.descr))
    }            
    
    return (
        <div>
            <AddNoteReduxForm onSubmit={submit} t={props.t}/>
        </div>   
    )
}

export default withNamespaces()(AddNoteComponent)