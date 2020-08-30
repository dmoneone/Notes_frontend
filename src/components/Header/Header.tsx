import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

type Props = {
    i18n: any,
    t: any
}

export const Header: FC<Props> = (props) => {
    const [lan, setLan] = useState('en')

    const onLanguageHandle = (event: any) => {
        let newLang = event.target.value;
        setLan(newLang)
        props.i18n.changeLanguage(newLang)
    }

    return (
        <div className='header'>
            <NavLink id='notes-title' to='/notes'>{props.t('header.mainTitle')}</NavLink>
            <div className='lan-panel'>
                <span>Select language</span>
                <label>
                    <input
                        id='jp'
                        className="with-gap" 
                        name="language" 
                        value="jp"
                        checked={lan === 'jp'}
                        type="radio" 
                        onChange={(e) => onLanguageHandle(e)}
                    />
                    <span>jp</span>
                </label>
                <label>
                    <input
                        id='en'
                        className="with-gap" 
                        name="language" 
                        value="en"
                        checked={lan === 'en'}
                        type="radio" 
                        onChange={(e) => onLanguageHandle(e)}
                    />
                    <span>en</span>
                </label>
            </div>
        </div>
    )
}
