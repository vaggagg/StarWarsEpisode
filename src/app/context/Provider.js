'use client'
import { createContext } from 'react';
import { useState } from 'react';

export const MoviesProvider = createContext({

    items: [],

    selectedId: null,

    filteredList: [],

});

export default function Provider ({children}) {

    const [selectedId, setSelectedId] = useState(null);

    const [items, setItems] = useState([]);

    const [filteredList, setFilteredList] = useState([]); 

    const value = {
        selectedId,
        items,
        filteredList,
        setSelectedId,
        setItems,
        setFilteredList
    };

    return (

        <MoviesProvider.Provider value={value}>

            {children}

        </MoviesProvider.Provider>

    );
}
    