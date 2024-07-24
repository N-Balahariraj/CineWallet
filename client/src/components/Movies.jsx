import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import { Alert } from 'react-bootstrap'
import Shimmer from './Shimmer';
import Cookies from 'js-cookie'

export default function Movies({ setNewMovie, setOverlay, search }) {
    const [msg, setMsg] = useState([])
    const [alert, setAlert] = useState(false)
    const [moviesData, setMoviesData] = useState([])
    const [filMovies, setFilMovies] = useState([])

    //Fetching movies data
    useEffect(() => {
        const accessToken = Cookies.get('ACCESS_TOKEN')

        fetch(`${process.env.REACT_APP_GLOBALHOST}/View`, {
            method : 'GET',
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `JWT ${accessToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => { setMoviesData(data.result); setFilMovies(data.result);})
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    // Searching function
    const searchMovie = (search) => {
        if (search == "") {
            setFilMovies(moviesData)
            return
        }
        const filteredMovies = moviesData.filter((M) => {
            return M.title.toLowerCase().includes(search.toLowerCase())
        })
        setFilMovies(filteredMovies)
    }

    useEffect(() => {
        searchMovie(search)
    }, [search])

    return (
        <>
            {
                alert &&
                <div className='w-[100%] h-[20%] flex flex-col items-center justify-around absolute z-10'>
                    <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                        <Alert.Heading>{msg[0]}</Alert.Heading>
                        <p>
                            {msg[1]}
                        </p>
                    </Alert>
                </div>
            }
            <div className='w-[100%] h-[98%] flex flex-wrap p-4 overflow-y-auto no-scrollbar'>
                {
                    filMovies.length
                        ? filMovies?.map((M) => <Movie key={M._id} title={M.title} desc={M?.desc} actors={M?.actors} director={M?.director} genre={M?.genre} setMsg={setMsg} setAlert={setAlert} setNewMovie={setNewMovie} setOverlay={setOverlay} />)
                        : <Shimmer />
                }
            </div>
        </>
    )
}
