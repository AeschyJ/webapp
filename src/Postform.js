import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsUpload } from 'react-icons/bs';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 登入狀態
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // 在此處檢查登入狀態，例如使用 sessionStorage 或其他方式儲存登入狀態
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo);

    if (isLoggedIn) {
      try {
        const response = await fetch('http://localhost:5000/post', {
          //http://localhost:5000/register傳到後端的port做運行
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setTitle('');
          setContent('');
          setPhoto(null);
          setSuccessMessage('貼文已新增'); 
          // 貼文成功後重新導向到首頁或其他頁面
          navigate('/');
        } else {
          console.log('無法新增貼文');
        }
      } catch (error) {
        console.log('發生錯誤:', error);
      }
    } else {
      console.log('請先登入');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="post-form">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <Form.Group controlId="formTitle">
        <Form.Label>標題：</Form.Label>
        <Form.Control type="text" value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group controlId="formContent">
        <Form.Label>內容：</Form.Label>
        <Form.Control as="textarea" rows={5} value={content} onChange={handleContentChange} />
      </Form.Group>
      <Form.Group controlId="formPhoto">
        <Form.Label>照片：</Form.Label>
        <div className="input-group">
          <div className="custom-file">
            <Form.Control
              type="file"
              accept="image/*"
              className="custom-file-input"
              onChange={handlePhotoChange}
            />
            <Form.Label className="custom-file-label">
              <BsUpload className="upload-icon" /> 選擇照片
            </Form.Label>
          </div>
        </div>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isLoggedIn}>
        {isLoggedIn ? '提交' : '請先登入'}
      </Button>
    </Form>
  );
};

export default PostForm;
