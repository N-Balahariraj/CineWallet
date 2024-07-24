import React, { useState } from "react";
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { registerValidation } from "../Utilities/authValidation";
import Alert from 'react-bootstrap/Alert';

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPass, setCheckPass] = useState('')
  const [status, setStatus] = useState([true, ''])
  const [alert, setAlert] = useState(false)

  const registerHandler = async () => {
    setStatus(registerValidation(name, email, password))
    if (password == checkPass && registerValidation(name, email, password)[0]) {
      try {
        const res = await fetch(`${process.env.REACT_APP_GLOBALHOST}/register`, {
          method: 'POST',
          credentials : 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name : name, 
            email : email, 
            password : password
          })
        })
        // if (!res.ok) throw new Error(res.status)
        const data = await res.json()
        console.log(data.message)
        setStatus([true, data.message+" ,Login to enter your wallet"])
      }

      catch (error) {
        console.log("err : ", error)
        setStatus([false, error.message])
      }
    }

    setAlert(true)
    setName('')
    setEmail('')
    setPassword('')
    setCheckPass('')
  }

  return (
    <>
      {
        alert &&
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          {status[1]}
        </Alert>
      }
      <MDBCard className="h-[80vh] w-[80vw] m-auto mt-5 overflow-hidden">
        <MDBRow className="h-[80vh] w-[100%]">
          <MDBCol
            md="10"
            lg="6"
            className="h-[100%] w-[50%] order-2 order-lg-1 d-flex flex-column justify-around px-5"
          >
            <p
              style={{ color: "#f55757" }}
              className="text-center h1 fw-semibold m-3 font-mono"
            >
              Sign up
            </p>

            <MDBInput
              style={{ width: "90%" }}
              label="Your Name"
              id="form1"
              type="text"
              onChange={e => setName(e.target.value)}
              value={name}
            />

            <MDBInput
              style={{ width: "90%" }}
              label="Your Email"
              id="form2"
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />

            <MDBInput
              style={{ width: "90%" }}
              label="Password"
              id="form3"
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />

            <MDBInput
              style={{ width: "90%" }}
              label="Repeat your password"
              id="form4"
              type="password"
              onChange={e => setCheckPass(e.target.value)}
              value={checkPass}
            />

            <MDBBtn
              style={{ width: "90%", borderRadius: "5px" }}
              className="mb-4"
              size="lg"
              color="danger"
              onClick={registerHandler}
            >
              Register
            </MDBBtn>

            <p className="small fw-bold m-2">
              Already have an account?{" "}
              <Link to={"/"} className="link-danger">
                Log In
              </Link>
            </p>
          </MDBCol>

          <MDBCol
            md="10"
            lg="6"
            className="h-[100%] w-[50%] flex items-center bg-[#f55757]"
          >
            <MDBCardImage className="ml-[0.4rem] rounded-md" src={process.env.PUBLIC_URL + "/Register.png"} />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </>
  );
}
