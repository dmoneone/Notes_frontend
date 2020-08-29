import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

export const Header: FC<any> = (props) => {

    return (
        <div className='header'>
            <NavLink to='/notes'>Notes</NavLink>
        </div>
    )
}
