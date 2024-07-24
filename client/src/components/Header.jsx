import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function Header({setOverlay, setSearch}) {
  const navigate = useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand><span className='text-[#f55757] font-semibold font'>CineWallet</span></Navbar.Brand>
        <Button 
          variant='danger' 
          onClick={() => {setOverlay(true)}}
        >
          <span className='flex justify-around items-center gap-2'>New Movies <CiSquarePlus className='text-xl' /></span>
          
        </Button>
        <Form className="d-flex w-[60%]" onSubmit={(e)=>{e.preventDefault(); setSearch(e.target[0].value);}}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant='danger' type='submit'>Search</Button>
        </Form>
        <Button 
        variant='danger'
        onClick={()=>{
          Cookies.remove('ACCESS_TOKEN')
          Cookies.remove('REFRESH_TOKEN')
          navigate('/')
        }}
        >
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}
