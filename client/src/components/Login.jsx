import React from "react";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBCard,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <MDBCard style={{width : "80vw", margin : "auto", marginTop : "5rem"}} className="h-[80vh] flex items-center justify-center overflow-hidden">
      <MDBRow className="h-[80vh] overflow-auto">
        <MDBCol className="h-[100%] bg-[#f55757] flex items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
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
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg1"
            type="password"
            size="lg"
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
            <MDBBtn style={{borderRadius : '5px'}} className="mb-0 px-5" size="lg" color="danger">
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
  );
}
