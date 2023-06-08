import React, { useState } from "react";
import { Card, Form, Accordion, Button, ButtonGroup } from 'react-bootstrap';

function Title(img, alt, title) {
    return (
        <Card className='justify-content-center d-flex'>
            <Card.Img 
                className='cardimg'
                variant="top" 
                src={img}
                alt={alt}
            />
            <Card.ImgOverlay>
                <Card.Title className='d-flex position-relative top-0 start-50 translate-middle-x mb-5 w-50 h-100 bg-dark text-light justify-content-center align-items-center fs-2'>{title}</Card.Title>
            </Card.ImgOverlay>
        </Card>
    );
}
function imgOption(arr, onAgeSelect) {
    return(
        <>
        {arr.map((item) => (
            <span className="add-padding">
                <input type="radio" name="age" id={item.id} class="input-hidden" onClick={onAgeSelect} required/>
                <label for={item.id}>
                    <p className="add-padding">{item.label}</p>
                    <img 
                        src={item.img}
                        alt={item.label}/>
                </label>
            </span>
        ))}
        </>
    );
}
function optionGroup(header, groupname, arr, onConditionSelect) {
    return (
        <>
        <div className='box'><Accordion.Item eventKey={groupname}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Body> 
                {arr.map((item) => (
                    <Form.Check class="form-check" className="option">
                        <input type="radio" class="form-check-input input-hidden" id={item.id} name={groupname} onClick={onConditionSelect} required/>
                        <label class="form-check-label" for={item.id}><div>{item.label}</div></label>
                    </Form.Check>
                ))}
                <Form.Check class="form-check" className="option">
                        <input type="radio" class="form-check-input input-hidden" id={groupname+"0"} name={groupname} onClick={onConditionSelect} required/>
                        <label class="form-check-label" for={groupname+"0"}><div>?</div></label>
                        <div class="invalid-feedback">*必填</div>
                </Form.Check>
            </Accordion.Body>
        </Accordion.Item></div>
        </>
    );
}
function options(groupname, arr, onConditionSelect) {
    return(
        <>
        {arr.map((item) => (
                <Form.Check class="form-check" className="option">
                    <input type="radio" class="form-check-input input-hidden" id={item.id} name={groupname} onClick={onConditionSelect} required/>
                    <label class="form-check-label" for={item.id}><div>{item.label}</div></label>
                </Form.Check>
        ))}
        </>
    );
}

function ShowMap () {
    const [location, setLocation] = useState("臺北");
    const [parameter, setParameter] = useState("獸醫");
    const locs = ["新北", "臺北", "桃園", "台中", "台南", "高雄", "基隆", "新竹", "苗栗", "彰化", "南投", "雲林", "嘉義", "屏東", "宜蘭", "花蓮", "台東", "澎湖", "金門", "連江"];
    return (
        <>
        <br/><div align="center">
        <h5>下面是一張顯示獸醫位置的地圖</h5>
        <h6>請選擇您所在的地區!</h6>
        <div className="add-more-padding"><Form.Select className="w-25 p-3" value={location} onChange={e => setLocation(e.target.value)}>
            {locs.map((item) => <option value={item}>{item}</option>)}
        </Form.Select><br/>
        <ButtonGroup aria-label="Basic example">
            <Button value="獸醫" variant="info" size="lg" onClick={e => setParameter(e.target.value)}>獸醫</Button> 
            <Button value="動物收容所" variant="warning" size="lg" onClick={e => setParameter(e.target.value)}>動物收容所</Button> 
        </ButtonGroup>
        </div>
            <iframe 
                width="300" 
                height="170" 
                src={`https://maps.google.com/maps?q=${parameter}+${location}&hl=zh-TW&z=13&amp&output=embed`}
            >
            </iframe>
        </div>
        </>
    );
}

export { Title, imgOption, optionGroup, options, ShowMap };