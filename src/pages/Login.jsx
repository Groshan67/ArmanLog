// import React,{ useContext, useRef } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import AuthContext from "../components/shared/AuthContext";

// const Login = () => {
//   const userName = useRef("");
//   const password = useRef("");
//   const { login } = useContext(AuthContext);

//   const loginSubmit = async () => {
//     let payload = {
//       username: userName.current.value,
//       password: password.current.value,
//     };

//     await login(payload);
//   };
//   return (
//     <>
//       <Container className="mt-4 p-8">
//         <Row>
//           <Col className="col-md-8 offset-md-2">
//             <legend>Login Form</legend>
//             <form>
//               <Form.Group className="mb-3" controlId="formUserName">
//                 <Form.Label>User Name</Form.Label>
//                 <Form.Control type="text" ref={userName} />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" ref={password} />
//               </Form.Group>
//               <Button variant="primary" type="button" onClick={loginSubmit}>
//                 Login
//               </Button>
//             </form>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };
// export default Login;








import React, { useContext, useRef } from "react";
import AuthContext from "../components/shared/AuthContext";
import "./style/Login.css";
import loginimage from "../assets/images/loginimage.png";
import logoarman from "../assets/images/logoarman.png";
import logomarkazi from "../assets/images/logomarkazi.png";


import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBCardImage,

}
  from 'mdb-react-ui-kit';

const Login = () => {

  const username = useRef("");
  const password = useRef("");
  const { login } = useContext(AuthContext);

  const loginSubmit = async () => {
    let payload = {
      username: username.current.value,
      password: password.current.value,
    };

    await login(payload);
  };
  return (
    <MDBContainer fluid className='p-6 background-radial-gradient overflow-hidden' style={{ padding: "15rem" }}>
      <MDBRow>
        <div className='d-flex justify-content-center mb-4'>
          <MDBCardImage src={logomarkazi} alt='markazi' className='rounded-t-5 rounded-tr-lg-0 dash-logo' fluid />
          <div />
          <MDBCardImage src={logoarman} alt='arman' className='rounded-t-5 rounded-tr-lg-0 dash-logo' fluid />
        </div>
      </MDBRow>
      <MDBRow>

        <MDBCol style={{ direction: 'rtl' }} md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <MDBCardImage src={loginimage} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          <h3 className="my-5 display-6 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            سامانه هاب سلامت  <br />
            <span >بیمه مرکزی ج.ا.ا</span>
          </h3>



        </MDBCol>

        <MDBCol style={{ direction: 'rtl' }} md='5' className='position-relative'>


          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5 background-card-gradient'>



              <MDBInput wrapperClass='mb-4' label='نام کاربری' id='formUserName' ref={username} type='username' />
              <MDBInput wrapperClass='mb-4' label='رمز عبور' id='formPassword' ref={password} type='password' />



              <MDBBtn  onClick={loginSubmit} className='w-100 mb-4 btn-grad' size='md'>ورود</MDBBtn>

              <div className="text-center">

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}


export default Login;