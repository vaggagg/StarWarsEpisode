'use client';

import { useEffect, useState } from "react";
import './_MainList.scss';
import { useContext } from 'react';
import { numberToRoman } from '../../helpers/convertToRoman';
import { MoviesProvider } from '../../context/Provider';
import StarComponent from "../Stars/Stars";
import { starCalculate } from "@/app/helpers/starCalculate";

export default function MainList() {

  const { items, setItems, filteredList } = useContext(MoviesProvider);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const { setSelectedId } = useContext(MoviesProvider);

  const setSelectedList = (episode_url) => {

    setSelectedId(episode_url);

  }

  useEffect(() => {

    setError(null);

    const fetchData = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          'https://swapi.dev/api/films/?format=json'
        );

        if (!response.ok) {

          setError(`API call was not ok (${response.status})`);

          throw new Error(`API call was not ok (${response.status})`);

        }

        const result = await response.json();

        const movies = result.results;
        for (let movie of movies) {

            const title = 'Star Wars: Episode ' + numberToRoman(movie.episode_id)+ '- ' + movie.title 
            
            const starResponse = await fetch('https://www.omdbapi.com/?apikey=c489b5e3&t=' + title.replace(' ', '+'));

            if (!starResponse.ok) {

              setError(`API call for stars was not ok (${starResponse.status})`);

              throw new Error(`API call for stars was not ok (${starResponse.status})`);

            }

            const starData = await starResponse.json();

            const { averageSum, star, totalSum, imdbRating, rottenTomatoesRating, metacriticRating  } = starCalculate(starData.Ratings);

            movie.stars = star;

            movie.averageSum = averageSum;

            movie.totalSum = totalSum;

            movie.imdbRating = imdbRating;

            movie.rottenTomatoesRating = rottenTomatoesRating;

            movie.metacriticRating = metacriticRating;

        }

        setItems(movies);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);
  return (

    <div className="main-list-container">

      <div className="list-container">

        {loading && <div className="loading-container"><div class="lds-dual-ring"></div></div>}

        {error && <div className="error"> {error} </div>}

        {
          !loading && !error && !items && <div className="empty"> No data </div>
        }

        {!loading && !error && items.length > 0 &&

          <ul className="episode-list">

            {
              filteredList.map((item) => {
                return (
                  <li className="episode" onClick={() => setSelectedList(item.url)}>

                    <div className="number">EPISODE {item.episode_id}</div>

                    <div className="title">Episode {numberToRoman(item.episode_id)} - {item.title}</div>

                    <div className="stars"> <StarComponent rating={item.stars}/> </div>

                    <div className="date">{item.release_date}</div>

                  </li>)
              })
            }

          </ul>

        }

      </div>

    </div>

  )
}