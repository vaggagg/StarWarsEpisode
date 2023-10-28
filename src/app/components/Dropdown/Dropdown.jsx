import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useContext, useEffect, useState } from 'react';
import { MoviesProvider } from '../../context/Provider';

export default function DropdownComponent() {

    const [option, setOption] = useState('');

    const options = ['Name', 'Episode', 'Release Date', 'Director', 'Producer', 'Rating']

    const { setFilteredList, filteredList } = useContext(MoviesProvider);

    const handleChange = (e) => {

        const { value } = e;

        switch (value) {

            case 'Name':

                setFilteredList([...filteredList.sort((a, b) => a.title.localeCompare(b.title))]);

                break;

            case 'Episode':

                setFilteredList([...filteredList.sort((a, b) => a.episode_id - b.episode_id)]);

                break;

            case 'Release Date':

                setFilteredList([...filteredList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))]);

                break;

            case 'Director':

                setFilteredList([...filteredList.sort((a, b) => a.director.localeCompare(b.director))]);

                break;

            case 'Producer':

                setFilteredList([...filteredList.sort((a, b) => a.producer.localeCompare(b.producer))]);

                break;
            case 'Rating': 
            setFilteredList([...filteredList.sort((a, b) => b.totalSum - a.totalSum)]);
        }

    }

    return (

        <div className="dropdown-container">

            <Dropdown options={options} onChange={(e) => handleChange(e)} value={option} placeholder='Sort by' />

        </div>
    )
}