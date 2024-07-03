import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ImBin } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function Movie({ title, desc, actors, director, genre, setMsg, setAlert, setNewMovie, setOverlay }) {

  const [edit, cancel] = useState(true)

  async function removeMovie(movieName) {
    try {
      const response = await fetch(
        `http://localhost:4500/Remove/${movieName}`,
        {
          method: 'DELETE'
        }
      )
      const result = response.json()
      console.log(result)
      setMsg(["Deletion Successfull", `The movie ${movieName} was removed successfully :) reload the page to view the changes`])
      setAlert(true)
    }
    catch (e) {
      console.log(e)
      setMsg(["Deletion Unsuccessfull", `The movie ${movieName} was not removed properly :(`])
      setAlert(true)
    }
  }

  return (
    <Card
      bg='Light'
      style={{ width: '18rem', height: '25rem' }}
      className="m-2"
    >
      <Card.Header className='h-[20%]'><Card.Title>{title}</Card.Title></Card.Header>
      <Card.Body className='h-[40%] overflow-y-auto scrollbar-hide '>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className='movieField'>{director}</ListGroup.Item>
        <ListGroup.Item className='movieField'>{actors}</ListGroup.Item>
        <ListGroup.Item className='movieField'>{genre}</ListGroup.Item>
      </ListGroup>
      <Card.Footer className='flex gap-3'>
        <button
          className='h-10 w-[2.5rem] text-lg flex items-center justify-around bg-[#da4747] text-white rounded-md hover:bg-[#b94646]'
          onClick={() => { removeMovie(title) }}
        >
          <ImBin />
        </button>
        <button
          className='h-10 w-[2.5rem] text-xl flex items-center justify-around bg-[#da4747] text-white rounded-md hover:bg-[#b94646]'
          onClick={() => {
            if (edit) {
              setNewMovie([true, [title, desc, actors, director, genre]])
              cancel(!edit)
              setOverlay(true)
            }
            else{
              setNewMovie([false, []])
              cancel(!edit)
              // setOverlay(false)
            }
          }}
        >
          {edit ? <MdEdit /> : <IoClose />}
        </button>
      </Card.Footer>
    </Card>
  );
}
