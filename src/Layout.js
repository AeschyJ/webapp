import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { LinkContainer } from 'react-router-bootstrap';
import MemberImg from "./member icon.svg";
import apis from './api'

function Layout() {
  const location = useLocation().pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  return (
    <div>
      <TopNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginMessage={loginMessage} setLoginMessage={setLoginMessage} />
      <Footer />
      <TransitionGroup>
        <CSSTransition
          timeout={1000}
          classNames='fade'
          key={location.key}
          unmountOnExit
        >
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function TopNav({ isLoggedIn, setIsLoggedIn, loginMessage, setLoginMessage }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleExperienceClick = () => {
    if (!isLoggedIn) {
      setErrorMessage('請先登入');
    } else {
      navigate('./postform');
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar expand="md" variant="light" bg="light" className="m-3 shadow-sm rounded sticky-top">
      <Container className='p-0 mx-5'>
        <LinkContainer to="homepage" className='px-5 fs-3'>
          <Navbar.Brand>浪浪Helper</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
          <Nav className="w-50 fs-5">
            <LinkContainer to="">
              <Nav.Link className='px-4 border-start border-end border-secondary'>首頁</Nav.Link>
            </LinkContainer>
            <LinkContainer to="quickguide">
              <Nav.Link className='px-4 border-start border-end border-secondary'>快速指引</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={handleExperienceClick} className='px-4 border-start border-end border-secondary'>實際案例</Nav.Link>
            <LinkContainer to="postpage">
              <Nav.Link className='px-4 border-start border-end border-secondary'>分享經驗</Nav.Link>
            </LinkContainer>
          </Nav>
          <Member setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setLoginMessage={setLoginMessage} handleLogout={handleLogout} />
        </Navbar.Collapse>
      </Container>
      {errorMessage && (
        <Alert variant="danger" className="mb-0" onClose={clearErrorMessage} dismissible>
          {errorMessage}
        </Alert>
      )}
      {loginMessage && (
        <Alert variant="success" className="mb-0" onClose={() => setLoginMessage('')} dismissible>
          {loginMessage}
        </Alert>
      )}
    </Navbar>
  );
}

function Footer(){
  return(
      <div className='w-100 text-light text-center' style={{position:'absolute', bottom:'0', height:'150px', backgroundColor:'black'}}>
          <br/>
          <p>版權所有 © 2023webapp_group15</p>
          <p>email：webapp_group15@gmail.com</p>
          <p>phone：0936-339199</p>
      </div>
  );
}

function Member({ setIsLoggedIn, isLoggedIn, setLoginMessage, handleLogout }) {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const navigate = useNavigate();

  const handleRedirect = () => {
    handleCloseModal();
    navigate('./register');
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(apis.login, {
        //http://localhost:5000/register傳到後端的port做運行
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 0) {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('JWT_TOKEN', data.data.token)
          setIsLoggedIn(true);
          setLoginMessage('登入成功'); // 設定登入成功訊息
          setShowModal(false);
          navigate('/');
        }
      } else {
        console.log('登入失敗');
      }
    } catch (error) {
      console.log('發生錯誤:', error);
    }
  };

  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
      setLoginMessage('登入或貼文上傳成功'); 
    }
  }, );

  return (
    <Nav>
      {isLoggedIn ? (
        <>
          <Nav.Link className='px-3' onClick={handleLogout}>登出</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link className='px-3' onClick={handleShowModal}>登入</Nav.Link>
          <Nav.Link className='px-3' onClick={handleRedirect}>註冊</Nav.Link>
        </>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className='mx-3'>
          <Modal.Title>會員登入</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label className='m-3 mt-0'>Email</Form.Label>
              <Form.Control type="email" placeholder="請輸入Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className='m-3'>密碼</Form.Label>
              <Form.Control className='mb-3' type="password" placeholder="請輸入密碼" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='justify-content-evenly'>
          {location.pathname.includes('register')
            ?<Button variant="secondary w-25" onClick={handleCloseModal}>取消</Button>
            :<Button variant="outline-success w-25" onClick={()=>{
              navigate('register');
              setShowModal(false)}}>點此加入</Button>
          }
          <Button variant="primary w-25" onClick={handleLogin}>登入</Button>
        </Modal.Footer>
      </Modal>
    </Nav>
  );
}

export default Layout;
