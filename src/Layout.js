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

function Layout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  return (
    <div>
      <TopNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginMessage={loginMessage} setLoginMessage={setLoginMessage} />
      <Footer />
      <TransitionGroup component={null}>
        <CSSTransition
          timeout={1250}
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
          <Navbar.Brand>網站名稱</Navbar.Brand>
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
            <Nav.Link onClick={handleExperienceClick} className='px-4 border-start border-end border-secondary'>經驗分享</Nav.Link>
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

function Footer() {
  return (
    <div className='w-100 text-light text-center' style={{ position: 'absolute', bottom: '0', height: '120px', backgroundColor: 'black' }}>
      Footer
    </div>
  );
}

function Member({ setIsLoggedIn, isLoggedIn, setLoginMessage, handleLogout }) {
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
      const response = await fetch('http://localhost:5000/login', {
        //http://localhost:5000/register傳到後端的port做運行
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === '登入成功') {
          sessionStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          setLoginMessage('登入成功'); // 設定登入成功訊息
          handleCloseModal();
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
  }, []);

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
        <Modal.Header closeButton>
          <Modal.Title>會員登入</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="請輸入Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>密碼:</Form.Label>
              <Form.Control type="password" placeholder="請輸入密碼" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>取消</Button>
          <Button variant="primary" onClick={handleLogin}>登入</Button>
        </Modal.Footer>
      </Modal>
    </Nav>
  );
}

export default Layout;
