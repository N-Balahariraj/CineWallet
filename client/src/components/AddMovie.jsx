import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { IoCloseOutline } from "react-icons/io5";
import Cookies from 'js-cookie'


export default function AddMovie({ newMovie, setOverlay }) {

    const [msg, setMsg] = useState([])
    const [alert, setAlert] = useState(false)
    const accessToken = Cookies.get('ACCESS_TOKEN')

    const getTargetValue = (e) => {
        if (e.target[0].value != '')
            return (
                {
                    title: e.target[0].value,
                    desc: e.target[1].value,
                    actors: e.target[2].value,
                    director: e.target[3].value,
                    genre: e.target[4].value
                })
        return false
    }

    const setTargetValue = (e, v = "") => {

        const Value = newMovie[0] && !v ? newMovie[1] : ["", "", "", "", ""];

        for (let i = 0; i < 5; i++) {
            e.target[i].value = Value[i];
        }
    }

    async function addMovie(e) {
        console.log(e.target[0].value)
        try {
            const response = await fetch(`${process.env.REACT_APP_GLOBALHOST}/Add`, {
                method: 'POST',
                body: JSON.stringify(getTargetValue(e)),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "authorization": `JWT ${accessToken}`
                }
            })
            const result = await response.json()

            if (result.message == "The movie already exist") {
                setMsg(["Duplicate movie", "The movie already exist"])
                setAlert(true)
            }

            setMsg(["My Collections", "The movie was added successfully :) Reload to view the changes"])
            setAlert(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function updateMovie(e) {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_GLOBALHOST}/Edit/${newMovie[1][0]}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(getTargetValue(e)),
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                        "authorization": `JWT ${accessToken}`
                    }
                }
            )

            const result = await response.json()

            if (result.status == 200) {
                setMsg(['Update Successfull', `${result.message}. Reload this page to view the changes`])
                setAlert(true)
            }
        }
        catch (e) {
            console.log(e.err)
            setMsg(['Update Unuccessfull', e.message])
            setAlert(true)
        }
    }

    return (
        <>
            <div className='flex flex-col mb-3'><IoCloseOutline className='self-end text-2xl cursor-pointer hover:text-[red]' onClick={() => { setOverlay(false); setAlert(false) }} /></div>
            {
                alert &&
                <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    <Alert.Heading>{msg[0]}</Alert.Heading>
                    <p>
                        {msg[1]}
                    </p>
                </Alert>
            }
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newMovie[0]) {
                        getTargetValue(e)
                            ? updateMovie(e)
                            : setMsg(["Empty title", "Enter the movie name :{"]); setAlert(true);
                        setTargetValue(e, ' ')
                        return
                    }
                    getTargetValue(e)
                        ? addMovie(e)
                        : setMsg(["Empty title", "Enter the movie name :{"]); setAlert(true);
                    setTargetValue(e, ' ')
                }}
                className='h-[60%]'
            >
                <div className='formField'>
                    <label htmlFor='title' className='formTitle'>Title</label>
                    <input id='title' name='title' type="text" placeholder="Movie title" className='formInput' defaultValue={newMovie[0] ? newMovie[1][0] : ""} />
                </div>

                <div className="formField">
                    <label htmlFor='desc' className="formTitle" >Description</label>
                    <input id='desc' name='desc' type="text" placeholder="Description of the Movie" className="formInput" defaultValue={newMovie[0] ? newMovie[1][1] : ""} />
                </div>

                <div className="formField">
                    <label htmlFor='actors' className="formTitle" >Actors</label>
                    <input id='actors' name='actors' type="text" placeholder="Actors in the Movie" className="formInput" defaultValue={newMovie[0] ? newMovie[1][2] : ""} />
                </div>

                <div className="formField">
                    <label htmlFor='director' className="formTitle" >Director</label>
                    <input id='director' name='director' type="text" placeholder="Director of the Movie" className="formInput" defaultValue={newMovie[0] ? newMovie[1][3] : ""} />
                </div>

                <div className="formField">
                    <label htmlFor='genre' className="formTitle" >Genre</label>
                    <input id='genre' name='genre' type="text" placeholder="Generes of the Movie" className="formInput" defaultValue={newMovie[0] ? newMovie[1][4] : ""} />
                </div>

                <button type="submit" className='formField bg-[#da4747] text-white rounded-md hover:bg-[#b94646]'>
                    {newMovie[0] ? 'Update' : 'Add'}
                </button>
            </form>
        </>
    )
}