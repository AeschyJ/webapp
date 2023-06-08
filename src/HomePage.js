import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {format} from 'date-fns'

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import { LinkContainer } from 'react-router-bootstrap';

import "./HomePage.css";
import Placeholder from './placeholder';
import Fetch from './Fetch';
import apis from './api';

import Shetland from "./img/dog-shetland-sheepdog-collie-sheltie-royalty-free-image-491206081-1565123992.jpg";
import Golden from "./img/golden-retriever-royalty-free-image-506756303-1560962726.jpg"
import Samoyed from "./img/samoyed-royalty-free-image-1581005065.jpg"
import Cat from "./img/QGCat/cat.jpg";
import Dog from "./img/QGdog/dog.png";
import Bird from "./img/QGbird/bird.jpg";
import Donate from "./img/donate.jpg"


var basename="/WEBAPP/React/build/"
function HomePage(){
    return(
        <div>
            <Description/>
            <Placeholder/>
            <QuickGuide/>
            <Experience/>
            <Donation/>
        </div>
    );
}
export default HomePage

function Description(){
    return(
                <Row className='mx-3 justify-content-evenly gy-3'>
                    <Col md={4} className='des col-lg-3 border border-dark rounded shadow-sm'>
                        <h3 className='m-3'>關於本站</h3>
                        <p className='m-3'>我們是一個由台大學生組成的團隊，我們發現該包含我們在內，大部分的人都不確定如何正確地拯救受傷的流浪動物，為了改善這個現象，故建立了一個救援指引網站，希望可以幫助到大家。</p>
                        <p className='m-3'>在我們的網站上，可以找到各種有關流浪動物救援的資源或文章，還有流浪動物的救援和的急救指南，目前指引包含路上最常見的貓、狗、鳥類，後續會陸續增加其他種類動物，也非常歡迎大家一起分享救援經驗。</p>
                    </Col>
                    <Col md={8}>
                        <Display/>
                    </Col>
                </Row>
    );
}

function Display(){
    return (
        <Carousel className='rounded border border-dark w-100 h-100 shadow-sm'>
          <Carousel.Item>
            <img
              className="d-block w-100 caroimg"
              src={Shetland}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>因為基因的關係，貓咪這種動物嚐不出甜味~</h3>
              <p>“我們相信每一隻生命都應該被尊重和關愛，無論牠們的種類或狀態如何。</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 caroimg"
              src={Golden}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>大多數的流浪狗並不會頻繁更換居所~</h3>
              <p>"動物是人類親密的朋友，人類是動物信賴的夥伴。"</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 caroimg"
              src={Samoyed}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>貓咪睡覺的時間高達牠們生命的70%!</h3>
              <p>"區分野小孩與毛小孩，是保育的開端。"</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

function QuickGuide(){
    return(
        <Container className='my-5'>
            <h2>快速指引</h2>
            
            <Container className='mt-5'>
                <Row className='px-auto g-3'>
                    <Col sm className='justify-content-center d-flex'>
                        <LinkContainer to={basename+'quickguide/dog'} style={{ width: '18rem' , height:'20rem'}}>
                            <Card className='card position-relative'>
                                <Card.Img 
                                className='QGcardimage'
                                variant="top" 
                                src={Dog}
                                alt='Dog'/>
                                <Card.ImgOverlay>
                                    <Card.Title className='d-flex position-absolute bottom-0 start-50 translate-middle-x mb-5 d-block w-100 bg-dark text-light justify-content-center opacity-75 h-25 align-items-center'>狗</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col sm className='justify-content-center d-flex'> 
                        <LinkContainer to={basename+'quickguide/cat'} style={{ width: '18rem' , height:'20rem'}}>
                            <Card className='card position-relative'>
                                <Card.Img 
                                className='QGcardimage'
                                variant="top"
                                src={Cat} 
                                alt='Cat'/>
                                <Card.ImgOverlay>
                                    <Card.Title className='d-flex position-absolute bottom-0 start-50 translate-middle-x mb-5 d-block w-100 bg-dark text-light justify-content-center opacity-75 h-25 align-items-center'>貓</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col sm className='justify-content-center d-flex'>
                        <LinkContainer to={basename+'quickguide/bird'} style={{ width: '18rem' , height:'20rem'}}>
                            <Card className='card position-relative'>
                                <Card.Img 
                                className='QGcardimage'
                                variant="top"
                                src={Bird}
                                alt='Bird'/>
                                <Card.ImgOverlay>
                                    <Card.Title 
                                    className='d-flex position-absolute bottom-0 start-50 translate-middle-x mb-5 d-block w-100 bg-dark text-light justify-content-center opacity-75 h-25 align-items-center'>
                                        鳥
                                    </Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
export {QuickGuide};

function Experience(){
    const navigate = useNavigate()
    const [mdShow, setmdShow] = useState(false);
    const handleExperienceClick = () => {
        if (sessionStorage.getItem('isLoggedIn')=== 'true') {
            navigate(`${basename}postpage`);
        } else {
            setmdShow(true);
        }
      };
    return(
        <>
            <Placeholder/>
                <div className="d-grid gap-2 w-50 my-3 mx-auto">
                    <Button variant="dark" size="lg" onClick={handleExperienceClick}>
                        我來分享
                    </Button>
                </div>
            <Placeholder/>
            <Container className='my-3'>
                <h2>緊急處置經驗</h2>
            </Container>
            <ShowExperience urgent='true'/>
            <Container className='my-3'>
                <h2>其他處置經驗</h2>
            </Container>
            <ShowExperience urgent='false'/>
            <Modal
                size="sm"
                show={mdShow}
                onHide={()=>setmdShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                className='rounded'
            >
                <Modal.Header className='bg-danger bg-opacity-50 rounded justify-content-center'>
                <Modal.Title id="example-modal-sizes-title-sm">
                    請先登入
                </Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    );
}
function ExperienceAll(){
    return(
        <>
            <Placeholder/>
            <Container className='my-3'>
                <h2 className='text-center'>處置經驗分享</h2>
            </Container>
            <ShowExperience page={1}/>
            <Placeholder/>
        </>
    );
}export {ExperienceAll}

function ShowExperience(props){
    let api = ''
    if(props.urgent === 'true'){
        api = apis.newest.urgent
    }else if(props.urgent === 'false'){
        api = apis.newest.normal
    }else{
        api = `${apis.newest.all}/${props.page}`
    }
    const [data, loading, error, cards] = Fetch(api);
    console.log(loading)
    if(error){
        console.log(data, loading, error, cards)
    }
    return(
        <div>
            <Container className='my-5'>
                <Row className='px-auto gy-4 justify-content-evenly'>
                    {loading ? <div>loading</div> : 
                        <ExperienceCard dataArray={api.includes(apis.newest.all) ? cards :
                            cards.slice(0,4)} postIds={data}></ExperienceCard>
                        // <Container className='my-5'>
                        //     <Row className='px-auto gy-3'>
                                // <Col sm className='justify-content-center d-flex col-md-3'>
                                //     <ExperienceCard src={Shetland} title='Title1' content='content' date='date' link=''/>
                                // </Col>
                                // <Col sm className='justify-content-center d-flex col-md-3'> 
                                //     <ExperienceCard src={Golden} title='Title2' content='content' date='date' link=''/>
                                // </Col>
                                // <Col sm className='justify-content-center d-flex col-md-3'>
                                //     <ExperienceCard src={Samoyed} title='Title3' content='content' date='date' link=''/>
                                // </Col>
                                // <Col sm className='justify-content-center d-flex col-md-3'>
                                //     <ExperienceCard src={Shetland} title='Title4' content='content' date='date' link=''/>
                                // </Col>
                        //     </Row>
                        // </Container>
                    }
                </Row>
            </Container>
        </div>
    );
}

function ExperienceCard(props){
    return (
        <>
        {props.dataArray.length === 0 
        ? <h3 className='text-center text-danger opacity-75'>暫時找不到案例</h3>
        : props.dataArray.map((data,idx)=>
            <Col sm className='justify-content-center d-flex col-md-3' key={data.title + idx}>
                <Card className='expcard' style={{ width: '15rem' }}>
                <Card.Img variant="top" src={data.image} className='cardimage'/>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.content}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <LinkContainer to={`${basename}posts/${props.postIds[idx]}`}>
                            <Button variant="outline-secondary">全文</Button>
                        </LinkContainer>
                    </ListGroup.Item>
                    <ListGroup.Item>{format(new Date(data.updateDate), "yyyy-MM-dd")}</ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
        )}
        </>
      );
}

function Donation(){
    return(
        <Row direction="horizontal" className='dona m-5 justify-content-around border border-dark rounded shadow-sm'>
            <Col sm={5} className='p-0'>
                <img src={Donate} alt='donationImage' className='donaImg'/>
            </Col>
            <Col sm={7} style={{minHeight: '50vh',}}>
                <Container className='p-3'>
                    <h2>立即捐款</h2>
                    <li><a href="https://east.neticrm.tw/civicrm/contribute/transact?reset=1&id=2" target="_blank">1. 台灣動物社會研究會</a></li>
                    <li><a href="http://www.hsapf.org.tw/" target="_blank">2. 財團法人動物流浪之家</a></li>
                    <li><a href="https://harvest365.org/org-intro/?organization=577" target="_blank">3. 社團法人臺灣咪可思關懷流浪動物協會</a></li>
                    <li><a href="https://www.loverabbit.org/about/20" target="_blank">4. 台灣愛兔協會</a></li>
                    <li><a href="https://www.lca.org.tw/" target="_blank">5. 關懷生命協會</a></li>
                    <li><a href="https://helpdogs.tw/dogs/gad0913?gad=1&gclid=Cj0KCQjwj_ajBhCqARIsAA37s0w14Qskmmc6my7KMjVlLS7xhUgYaNQl3m7oCTcGF_OI_fOmTQ7O4P8aAmH7EALw_wcB" target="_blank">6. 浪愛集食</a></li>
                    <h5>"給浪浪們一頓溫飽"</h5>
                </Container>
            </Col>
        </Row>
    );
}