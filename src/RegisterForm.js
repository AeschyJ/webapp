import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import apis from './api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Placeholder from './placeholder';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track registration status
  const [registrationError, setRegistrationError] = useState(null); // Track registration error

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apis.users, {
        //http://localhost:5000/register傳到後端的port做運行
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setRegistrationSuccess(true); // Update registration status
        setRegistrationError(null); // Clear registration error
        axios.post(
          apis.login,
          {'email':formData.email,'password':formData.password}
        ).then((response)=>{
          navigate(-1);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('JWT_TOKEN', response.data.token)
          setTimeout(()=>navigate('/'), 1000)}
          ).catch((error)=>{
            console.log(error);
            if(error.response.status === 409){
              setRegistrationError('發生錯誤，請重試(可能為信箱已使用或名字已使用)'); // Set generic error message
              setRegistrationSuccess(false); // Set registration success to false
            }}
        )
      } else {
        const data = await response.json();
        setRegistrationError(data.message); // Set registration error message
        setRegistrationSuccess(false); // Set registration success to false
      }
    } catch (error) {
      console.error('發生錯誤', error);
      setRegistrationError('發生錯誤，請重試(可能為信箱已使用或名字已使用)'); // Set generic error message
      setRegistrationSuccess(false); // Set registration success to false
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      navigate(-1)
    }
    let timer;
    if (registrationSuccess || registrationError) {
      timer = setTimeout(() => {
        setRegistrationSuccess(false);
        setRegistrationError(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [registrationSuccess, registrationError]);

  return (
    <Container>
      <h1 className='mt-5 text-center'>註冊新帳號</h1>
      {registrationSuccess && (
        <Alert variant="success">註冊成功</Alert>
      )}
      {registrationError && (
        <Alert variant="danger">{registrationError}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName" className='my-3'>
          <Form.Label><h4>姓名</h4></Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="輸入姓名"
            value={formData.name}
            onChange={handleChange}
            required
            ref={nameInputRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className='my-3'>
          <Form.Label><h4>電子信箱</h4></Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="輸入電子信箱"
            value={formData.email}
            onChange={handleChange}
            required
            ref={emailInputRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='my-3'>
          <Form.Label><h4>密碼</h4></Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="輸入密碼"
            value={formData.password}
            onChange={handleChange}
            required
            ref={passwordInputRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword" className='my-3'>
          <Form.Label><h4>確認密碼</h4></Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="確認密碼"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            ref={confirmPasswordInputRef}
          />
        </Form.Group>

        <Row className='justify-content-evenly m-5'>
            <Col as={Button} sm={5} variant='secondary' size='lg' onClick={()=>{ navigate(-1)}}>取消</Col>
            <Col as={Button} sm={5} type="submit" size='lg' onClick={()=>{
                // console.log(!values.image3);
                // console.log(!!values.imagedes3);
            }}>送出</Col>
        </Row>
      </Form>
      <Placeholder/>
    </Container>
  );
}

export default RegisterForm;

