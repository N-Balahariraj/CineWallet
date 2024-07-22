import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CiSquarePlus } from "react-icons/ci";

export default function Header({setOverlay, setSearch}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand><span className='text-[#f55757] font-semibold font'>CineWallet</span></Navbar.Brand>
        <button 
          className='h-9 w-[10%] flex items-center justify-around bg-[#f55757] text-white rounded-md hover:bg-[#d44f4f]' 
          onClick={() => {setOverlay(true)}}
        >
          <span>New Movies</span>
          <CiSquarePlus className='text-xl' />
        </button>
        <Form className="d-flex w-[60%]" onSubmit={(e)=>{e.preventDefault(); setSearch(e.target[0].value);}}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant='danger' type='submit'>Search</Button>
        </Form>
        <Nav.Link href="#action2" className='w-[10%]'>Logout</Nav.Link>
      </Container>
    </Navbar>
  );
}
