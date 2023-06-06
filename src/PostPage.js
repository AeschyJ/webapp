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
import axios from 'axios';
import apis from './api';

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
      location: yup.string().required(),
      content: yup.string().required(),
      image1: yup.mixed().required(),
      image1des: yup.string(),
      image2: yup.mixed().notRequired(),
      image2des: yup.string(),
      image3: yup.mixed().notRequired(),
      image3des: yup.string(),
      urgent: yup.boolean(),
    });
  
    return (
        <Container>
        <Formik
            validationSchema={schema}
            onSubmit={(values)=>{
                let data = new FormData();
                Object.entries(values).forEach((value) => {
                    data.append(value[0],value[1])
                });
                // data.append('image1',values.image1)
                let headers={'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('JWT_TOKEN')}
                axios.post(
                    apis.posts,
                    data,
                    {headers: headers}
                ).then(navigate(-1)).catch((error)=>
                    console.log(error)
                )
            }}
            initialValues={{
            title: '',
            location: '',
            content: '',
            image1: null,
            image1des: '',
            image2: null,
            image2des: '',
            image3: null,
            image3des: '',
            urgent: false,
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue}) => (
                    
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
                <div className="d-grid">
                    <Form.Group controlId="validationFormik01">
                        <Form.Label className=''>
                            <h3>發生地點</h3>
                        </Form.Label>
                        <Form.Control
                        type="text"
                        size="lg"
                        name="location"
                        placeholder='地點'
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.location && !!errors.location}
                        />
                        <Form.Control.Feedback type='invalid'>請輸入發生地點</Form.Control.Feedback>
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
                    <Form.Group as={Col} lg={3} className='my-3'>
                        <Form.Label>
                            <h4>上傳圖片</h4>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        accept='image/*'
                        required
                        name="image1"
                        onChange={(event) => {
                            setFieldValue("image1", event.currentTarget.files[0]);}}
                        onBlur={handleBlur}
                        isInvalid={!!errors.image1 && touched.image1}
                        />
                        <Form.Control.Feedback type="invalid">請上傳至少一張圖片</Form.Control.Feedback>
                        <InputGroup hasValidation size="md" style={{minHeight:"90px"}}>
                            <Form.Control
                            type="text"
                            name="image1des"
                            placeholder='圖片描述'
                            value={values.image1des}
                            onChange={handleChange}
                            as="textarea"
                            aria-label="Middle"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} lg={3} className='my-3'>
                        <Form.Label>
                            <h4>上傳圖片2</h4>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        accept='image/*'
                        name="image2"
                        onChange={(event) => {
                            setFieldValue("image2", event.currentTarget.files[0]);}}
                        onBlur={handleBlur}
                        isInvalid={!values.image2 && !!values.image2des}
                        />
                        <Form.Control.Feedback type="invalid">請上傳圖片</Form.Control.Feedback>
                        <InputGroup hasValidation size="md" style={{minHeight:"90px"}}>
                            <Form.Control
                            type="text"
                            name="image2des"
                            placeholder='圖片描述'
                            value={values.image2des}
                            onChange={handleChange}
                            as="textarea"
                            aria-label="Middle"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} lg={3} className='my-3'>
                        <Form.Label>
                            <h4>上傳圖片3</h4>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        accept='image/*'
                        name="image3"
                        onChange={(event) => {
                            setFieldValue("image3", event.currentTarget.files[0]);}}
                        onBlur={handleBlur}
                        isInvalid={!values.image3 && !!values.image3des}
                        />
                        <Form.Control.Feedback type="invalid">請上傳圖片</Form.Control.Feedback>
                        <InputGroup hasValidation size="md" style={{minHeight:"90px"}}>
                            <Form.Control
                            type="text"
                            name="image3des"
                            placeholder='圖片描述'
                            value={values.image3des}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as="textarea"
                            aria-label="Middle"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 fs-5">
                    <Form.Check
                    name="urgent"
                    label="可做為緊急情況參考"
                    onChange={handleChange}
                    isInvalid={!!errors.urgent}
                    feedback={errors.urgent}
                    feedbackType="invalid"
                    id="validationFormik0"
                    />
                </Form.Group>

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
