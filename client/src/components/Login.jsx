import React, { useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBCard,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Utilities/authValidation"
import Alert from 'react-bootstrap/Alert';

export default function Login({setLog}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState([false, ''])
  const [alert, setAlert] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {
    setStatus(loginValidation(email, password))

    if (loginValidation(email, password)) {
      try {
        const res = await fetch("https://cinewallet.onrender.com/login", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        if (!res.ok) throw new Error(res.status)
        const data = await res.json()
        setStatus([true, data.message])
        setLog('In')
        navigate('/app')
        console.log(data)
      }

      catch (error) {
        setStatus([false, error.message])
        console.log("err : ", error)
      }
    }

    setAlert(true)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      {
        alert &&
        <Alert variant="danger" onClose={()=>setAlert(false)} dismissible >
            {status[1]}
        </Alert>
      }
      <MDBCard style={{ width: "80vw", margin: "auto", marginTop: "5rem" }} className="h-[80vh] flex items-center justify-center overflow-hidden">
        <MDBRow className="h-[80vh] w-[100%] overflow-auto">
          <MDBCol className="h-[100%] bg-[#f55757] flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/Login.png"}
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6" className="py-4 px-5">
            <p style={{ color: "#f55757" }} className="text-center h1 fw-semibold m-3 font-mono" >
              Sign In
            </p>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg0"
              type="email"
              size="lg"
              onChange={e => { setEmail(e.target.value) }}
              value={email}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg1"
              type="password"
              size="lg"
              onChange={e => { setPassword(e.target.value) }}
              value={password}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <Link to={"#"} className="link-danger">Forgot password?</Link>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn style={{ borderRadius: '5px' }} className="mb-0 px-5" size="lg" color="danger" onClick={handleLogin}>
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <Link to={'/register'} className="link-danger">
                  Register
                </Link>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </>
  );
}
