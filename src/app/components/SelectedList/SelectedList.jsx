'use client'
import { useContext } from 'react'
import Image from 'next/image';
import './_SelectedList.scss'
import { useEffect, useState } from 'react';
import { MoviesProvider } from '../../context/Provider';
import { numberToRoman } from '../../helpers/convertToRoman';
import StarComponent from '../Stars/Stars';
import { starCalculate } from '../../helpers/starCalculate';
export default function SelectedList() {

    const { selectedId } = useContext(MoviesProvider);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [data, setData] = useState(null);

    useEffect(() => {

        if (!selectedId) return;

        setError(null);

        const controller = new AbortController();

        const fetchData = async () => {

            try {

                setLoading(true);

                const response = await fetch(

                    selectedId,

                    { signal: controller.signal }

                );

                if (!response.ok) {

                    setError(`API call was not ok (${response.status})`);

                    throw new Error(`API call was not ok (${response.status})`);

                }

                const movie = await response.json();

                const title = 'Star Wars: Episode ' + numberToRoman(movie.episode_id) + '- ' + movie.title

                const starResponse = await fetch('https://www.omdbapi.com/?apikey=c489b5e3&t=' + title.replace(' ', '+'));

                if (!starResponse.ok) {

                    setError(`API call for stars was not ok (${starResponse.status})`);

                    throw new Error(`API call for stars was not ok (${starResponse.status})`);

                }

                const starData = await starResponse.json();

                const { averageSum, star, totalSum, imdbRating, rottenTomatoesRating, metacriticRating } = starCalculate(starData.Ratings);

                movie.stars = star;

                movie.averageSum = averageSum;

                movie.totalSum = totalSum;

                movie.imdbRating = imdbRating;

                movie.rottenTomatoesRating = rottenTomatoesRating;

                movie.metacriticRating = metacriticRating;

                movie.poster = starData.Poster;
                
                setData(movie);

            } catch (err) {

                if (err.name === "AbortError") {

                    return;

                }

                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchData();

        return () => {

            controller.abort();

        };

    }, [selectedId]);

    return (

        <div className="selected-list-container">

            <div className="details-container">

                {loading && <div className="loading-container"><div class="lds-dual-ring"></div></div>}

                {error && <div className="error"> {error} </div>}

                {!loading && !error && !data && <div className="empty"> Please select an episode. </div>}

                {!loading && !error && data &&

                    <div className="details">

                        <div className='title'>EPISODE {numberToRoman(data.episode_id)} - {data.title}</div>
                        <div className='details-poster-container'>
                            <img src={data.poster} alt={data.title} />
                            <div className='details' dangerouslySetInnerHTML={{ __html: data.opening_crawl }}></div>
                        </div>
                        <div className='director'>Director: {data.director}</div>

                        <StarComponent rating={data.stars} />

                        <div className='rating-container'>
                            <span className='rating'>Internet Movie Database: {data.imdbRating}%</span>
                            <span className='rating'>Rotten Tomatoes: {data.rottenTomatoesRating}%</span>
                            <span className='rating'>Metacritic: {data.metacriticRating}%</span>
                        </div>

                    </div>

                }

            </div>

        </div>
    )
}