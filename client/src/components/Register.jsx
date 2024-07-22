import React from "react";
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Register() {
  return (
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
          />

          <MDBInput
            style={{ width: "90%" }}
            label="Your Email"
            id="form2"
            type="email"
          />

          <MDBInput
            style={{ width: "90%" }}
            label="Password"
            id="form3"
            type="password"
          />

          <MDBInput
            style={{ width: "90%" }}
            label="Repeat your password"
            id="form4"
            type="password"
          />

          <MDBBtn
            style={{ width: "90%", borderRadius: "5px" }}
            className="mb-4"
            size="lg"
            color="danger"
          >
            Register
          </MDBBtn>

          <p className="small fw-bold m-2">
            Already have an account?{" "}
            <Link to={"/login"} className="link-danger">
              Log In
            </Link>
          </p>
        </MDBCol>

        <MDBCol
          md="10"
          lg="6"
          className="h-[100%] w-[50%] flex items-center bg-[#f55757]"
        >
          <MDBCardImage className="ml-[0.4rem] rounded-md" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" />
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}
