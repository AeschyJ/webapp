import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function RegisterForm() {
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
      const response = await fetch('http://localhost:5000/register', {
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
    <div>
      <h1>註冊新帳號</h1>
      {registrationSuccess && (
        <Alert variant="success">註冊成功</Alert>
      )}
      {registrationError && (
        <Alert variant="danger">{registrationError}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>姓名</Form.Label>
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

        <Form.Group controlId="formBasicEmail">
          <Form.Label>電子信箱</Form.Label>
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>密碼</Form.Label>
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

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>確認密碼</Form.Label>
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

        <Button variant="primary" type="submit">
          註冊
        </Button>
      </Form>
    </div>
  );
}

export default RegisterForm;

