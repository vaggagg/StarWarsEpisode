'use client'

import './_Input.scss'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MoviesProvider } from '../../context/Provider';
import DropdownComponent from '../Dropdown/Dropdown';

export default function Input() {

    const { setFilteredList, items } = useContext(MoviesProvider);

    useEffect(() => {

        setFilteredList(items);

    }

    , [items])

    const changeText = (e) => {

        if (e.target.value === '')
            setFilteredList(items)
        else
            setFilteredList(items.filter(movie => movie.title.toLowerCase().includes(e.target.value)))
    }
    return (

        <div className="input-container">

             <DropdownComponent />

            <input type="text" placeholder="Search" onChange={(e) => changeText(e)} />

        </div>

    )

}