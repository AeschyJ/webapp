import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useNavigate} from 'react-router-dom'

import * as formik from 'formik';
import * as yup from 'yup';

import Placeholder from './placeholder';
import "./HomePage.css";

function PostPage(){
    return(
        <div>
            <PostForm/>
        </div>
    );
}
export default PostPage

function PostForm() {
    const navigate = useNavigate();
    const { Formik } = formik;
  
    const schema = yup.object().shape({
      title: yup.string().required(),
      content: yup.string().required(),
      image1: yup.mixed().required(),
      imagedes1: yup.string(),
      image2: yup.mixed().notRequired(),
      imagedes2: yup.string(),
      image3: yup.mixed().notRequired(),
      imagedes3: yup.string(),
    });
  
    return (
        <Container>
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
            title: '',
            content: '',
            image1: null,
            imagedes1: '',
            image2: null,
            imagedes2: '',
            image3: null,
            imagedes3: '',
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    
            <Form noValidate onSubmit={handleSubmit}>
                <div className="d-grid">
                    <Form.Group controlId="validationFormik01">
                        <Form.Label className='my-3'>
                            <h2>文章標題</h2>
                        </Form.Label>
                        <Form.Control
                        type="text"
                        size="lg"
                        name="title"
                        placeholder='標題'
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.title && !!errors.title}
                        />
                        <Form.Control.Feedback type='invalid'>請輸入文章標題</Form.Control.Feedback>
                    </Form.Group>
                </div>
                <br/>

                <Form.Label>
                    <h3>內文</h3>
                </Form.Label>
                <InputGroup hasValidation size="lg" style={{minHeight:"276px"}}>
                    <Form.Control
                    type="text"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.content && !!errors.content}
                    as="textarea"
                    aria-label="Large"
                    />
                    <Form.Control.Feedback type="invalid">請輸入內文</Form.Control.Feedback>
                </InputGroup>

                <Row className="my-5 justify-content-between">
                    <Form.Group as={Col} md={3}>
                        <Form.Label>
                            <h4>上傳圖片</h4>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        accept='image/*'
                        required
                        name="image1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.image1 && touched.image1}
                        />
                        <Form.Control.Feedback type="invalid">請上傳圖片</Form.Control.Feedback>
                        <InputGroup hasValidation size="md" style={{minHeight:"90px"}}>
                            <Form.Control
                            type="text"
                            name="imagedes1"
                            placeholder='圖片描述'
                            value={values.imagedes1}
                            onChange={handleChange}
                            as="textarea"
                            aria-label="Middle"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md={3}>
                        <Form.Label>
                            <h4>上傳圖片2</h4>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        accept='image/*'
                        name="image2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!values.image2 && !!values.imagedes2}
                        />
                        <Form.Control.Feedback type="invalid">請上傳圖片</Form.Control.Feedback>
                        <InputGroup hasValidation size="md" style={{minHeight:"90px"}}>
                            <Form.Control
                            type="text"
                            name="imagedes2"
                            placeholder='圖片描述'
                            value={values.imagedes2}
                            onChange={handleChange}
                            as="textarea"
                            aria-label="Middle"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md={3}>
                        <Form.Label>
                            <h4>上傳圖片3</h4>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        accept='image/*'
                        name="image3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!values.image3 && !!values.imagedes3}
                        />
                        <Form.Control.Feedback type="invalid">請上傳圖片</Form.Control.Feedback>
                        <InputGroup hasValidation size="md" style={{minHeight:"90px"}}>
                            <Form.Control
                            type="text"
                            name="imagedes3"
                            placeholder='圖片描述'
                            value={values.imagedes3}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as="textarea"
                            aria-label="Middle"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>

                <Row className='justify-content-evenly m-5'>
                    <Col as={Button} sm={5} variant='secondary' onClick={()=>{ navigate(-1)}}>取消</Col>
                    <Col as={Button} sm={5} type="submit" onClick={()=>{
                        // console.log(!values.image3);
                        // console.log(!!values.imagedes3);
                    }}>送出</Col>
                </Row>
            </Form>
            )}
        </Formik>
        <Placeholder/>
    </Container>
    );
  }
