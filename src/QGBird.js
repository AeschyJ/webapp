import React from 'react';
import { Form, Button, Alert, Accordion, ButtonGroup } from 'react-bootstrap';
import { Title, imgOption, optionGroup, options, ShowMap } from './QuickGuide';
import "./QuickGuide.css";

import Pigeon from "./img/pigeons.jpg";
import a_bird from "./img/QGbird/adult_bird.jpg";
import b_bird from "./img/QGbird/baby_bird.jpg";
import fledgling from "./img/QGbird/fledgling.jpg";

const age = [
    {id:'newborn', label:'雛鳥', img:fledgling}, 
    {id:'chick', label:'幼鳥', img:b_bird},
    {id:'adult', label:'成鳥', img:a_bird}
];
const group0 = [
    {label:'尚無發現', id:'01'}, 
    {label:'明顯外傷', id:'02'}, 
    {label:'尚在流血', id:'03'}, 
    {label:'有蛆蟲', id:'04'}, 
];
const group1 = [
    {label:'正常(安穩)', id:'11'}, 
    {label:'警覺', id:'12'}, 
    {label:'沉鬱', id:'13'}, 
    {label:'無意識', id:'14'}, 
];
const group2 = [
    {label:'正常', id:'21'}, 
    {label:'冷/涼', id:'22'}, 
    {label:'失溫', id:'23'},  
];
const group3 = [
    {label:'正常(對稱)', id:'31'}, 
    {label:'不對稱', id:'32'}, 
    {label:'歪斜', id:'33'}, 
    {label:'有缺口', id:'34'}, 
];
const group4 = [
    {label:'正常(柔順)', id:'41'}, 
    {label:'掉毛', id:'42'}, 
    {label:'濕黏', id:'43'}, 
];
const healthyNestResult= [
    "這隻鳥是健康的!", 
    "要將一隻新生鳥放回巢中，可以按照以下步驟進行：",
    "1. 觀察鳥巢：首先，觀察周圍的環境，確定你找到了正確的鳥巢。新生鳥的巢通常位於樹枝、灌木叢或其他適合築巢的地方。", 
    "2. 確認鳥巢的安全：確保鳥巢是安全的，並且不會因為放回鳥兒而威脅到它的生命。如果鳥巢已經受損或不穩定，你可以修理或重新建造一個安全的巢。",
    "3. 使用手套：戴上輕薄的手套，以保護自己和鳥兒。這樣可以避免傳遞異味或將人類的氣味留在鳥身上，以免驚擾鳥巢的家長。",
    "4. 將鳥兒放回巢中：輕輕地將新生鳥放回巢中。如果鳥巢位於樹上，你可以使用梯子或爬樹器材來到達巢的位置。輕輕地將鳥兒放在巢的中央，確保它能夠安全地坐在巢上。",
    "5. 觀察：退後一些距離，但保持觀察鳥巢的距離，並避免驚擾鳥巢的家長。觀察鳥巢，確保家長鳥回到巢中繼續照顧鳥兒。",
];
const healthyNoNestResult = [
    "這隻鳥是健康的!",
    "如果你找不到新生鳥的巢，以下是你可以採取的步驟：",
    "1. 觀察鳥兒的狀態：首先，評估鳥兒的狀態。如果它看起來健康、有羽毛，並且能夠跳躍或行走，那麼可能是一隻已經可以離巢的鳥兒。在這種情況下，你可以確保附近的安全區域，並讓鳥兒自己尋找食物和庇護。",
    "2. 提供臨時避難所：如果新生鳥還沒有羽毛、無法跳躍或行走，你可以為它提供一個臨時的避難所。使用一個小而溫暖的盒子或容器，鋪上柔軟的紗布或紙巾，並放置在安靜、暗淡的地方，遠離寵物和干擾。",
    "3. 不要餵食：對於新生鳥，不要試圖餵食它們。野生鳥類的食物需求和消化系統很特殊，錯誤的餵食可能會對它們造成傷害。最好將這方面的照顧交給經驗豐富的野鳥救護機構或獸醫。",
    "4. 尋求專業幫助：如果你找不到鳥巢並且不確定如何處理新生鳥，最好尋求專業的野鳥救護機構或獸醫的幫助。他們具有相關的專業知識和資源，能夠為受傷或需要特殊照顧的野生鳥類提供適當的援助。",
    "請記住，野生鳥類需要特別的照顧和專業知識。最好將受傷或無法找到巢的新生鳥交給相關的機構或專業人士處理，以確保它們得到最佳的照顧和康復機會。",
];
const healthyAdultResult = ["這是一隻健康的成鳥! 請不要動牠即可!"];
const unwellResult = [
    "這隻鳥目前狀態危險!",
    "遇到受傷或生病的鳥類時，以下是你可以採取的步驟：",
    "1. 確保安全：請確保自己和鳥類的安全。戴上輕薄的手套以保護自己，同時避免鳥類對你的受傷或疾病造成傷害。如果可能，使用輕柔的紗布或毛巾輕輕地包裹住鳥兒，以避免進一步的傷害。",
    "2. 放置在安全容器中：將受傷或生病的鳥類放置在一個安全、溫暖且安靜的容器中。使用一個適當大小的盒子或籠子，加上柔軟的床墊（如毛巾或紙巾），提供鳥類一個舒適的環境。確保容器有通風孔，避免直接曝露於陽光下。",
    "3. 減少干擾：將鳥類放置在安全容器後，減少與其接觸和干擾。保持容器的環境安靜、溫暖且暗淡，遠離寵物、兒童和其他干擾源。",
    "4. 尋求專業幫助：最好尋求經驗豐富的野鳥救護機構或獸醫的幫助。他們擁有專業的知識和設施，能夠提供適當的醫療護理和救助，以確保鳥類得到最佳的照顧和康復機會。",
    "5. 不要試圖自行治療：不要試圖自行治療鳥類，尤其不要給予人類的藥物或食物。野生鳥類的醫療需求與人類不同，使用不適當的治療方法可能對鳥類造成更大的傷害。",
    "請記住，野生鳥類需要特別的照顧和專業知識。尋求專業的野鳥救護機構或獸醫的幫助是最佳的選擇，以確保受傷或生病的鳥類獲得適當的醫療和照顧。",
];
const unableToDetermine = ["情況難以鑑定!", "為了確保動物健康，請帶牠到獸醫院!"];

function QGBird(){
    return(
        <div>
            {Title(Pigeon, "pigeons", "傷救指引：鳥")}
            <Bird/>
        </div>
    );
}
export default QGBird;

class SelectAge extends React.Component {
    render() {
        if (this.props.activeSection === "age") {
            return (
            <>
            <div align='center'>
            <Form>
                <div className="add-more-padding">
                    {imgOption(age, this.props.onAgeSelect)}
                </div>
                <Button name="healthcheck" onClick={this.props.onNext}>Next</Button><br/>
            </Form>
            </div>
            </>
        );
        } else {
            return null;
        }
    }
}

class HealthCheck extends React.Component {
    render() {
    if (this.props.activeSection === "healthcheck") { 
        return (
        <div align="center">
            <Form className="was-validated">
                <Accordion defaultActiveKey={['0', '1', '2', '3','4']} alwaysOpen>
                    {optionGroup("目視外傷", "0", group0, this.props.onConditionSelect)}
                    {optionGroup("精神狀況", "1", group1, this.props.onConditionSelect)}
                    {optionGroup("體溫狀態", "2", group2, this.props.onConditionSelect)}
                    {optionGroup("肢體外貌", "3", group3, this.props.onConditionSelect)}
                    {optionGroup("羽毛狀態", "4", group4, this.props.onConditionSelect)}
                </Accordion> 
            </Form>
            <div className="submit-button">
                <ButtonGroup aria-label="Basic example">
                    <Button name="age" variant="secondary" size="lg" onClick={this.props.onBack}>back</Button> 
                    <Button type="submit" variant="primary" size="lg" onClick={this.props.onSubmit}>提交</Button> 
                </ButtonGroup>
            </div> 
        </div>
        );
    } 
    else {
        return null;
    }
    }
}

class UnfinAlert extends React.Component {
    render() {
        if(this.props.alert===true && this.props.activeSection === "healthcheck"){
            return(
                <div align="center"><div className="box"><Alert variant="danger">表格未完成！</Alert></div></div>
            );
        }
    }
}

class EnvironmentCheck extends React.Component {
    render() {
        if(this.props.activeSection === "environmentcheck"){
            const TF0 = [
                {id:'t0', label:'是'},
                {id:'f0', label:'否'}
            ];
            const TF1 = [
                {id:'t1', label:'是'},
                {id:'f1', label:'否'}
            ];
            return(
                <div align="center">
                <div className='result-container' align="center">
                    <h2>這隻鳥目前狀態健康!</h2>
                    <h4>請問您可以找到牠的巢穴嗎?</h4>
                    {options("nest", TF0, this.props.onSelect)}
                    <h4>牠可以自己回到牠的巢穴嗎?</h4>
                    {options("canReturn", TF1, this.props.onSelect)}
                    <Button type="submit" variant="primary" size="lg" onClick={this.props.onSubmit}>提交</Button> 
                    <h4>{this.props.instruction}</h4>
                </div></div>
            );
        }
    }
}

class Result extends React.Component {   
    render() {
        const resultArr = this.props.result;
        if (this.props.activeSection === "result") {
            return (
                <div align="center">
                <div className="result-container">
                    <h2>結果</h2><br/>
                    {resultArr.map((item) => (
                        <><p>{item}</p><br/></>
                    ))}
                    <Button name="healthcheck" variant="secondary" size="lg" onClick={this.props.onBack}>back</Button> 
                </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

class Map extends React.Component { 
    render() {
        if (this.props.activeSection === "result" && (this.props.result!=={healthyNestResult} || this.props.result!=={healthyNoNestResult})) {
            return (
                <ShowMap/>
            );
        } else {
            return null;
        }
    }
}

class Bird extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: "age",
            selectedAge: "",
            condition: ["", "", "", "", ""],
            result: [], 
            completion: false,
            showAlert: false,

            nest: null,
            canReturn: null
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleAgeSelection = this.handleAgeSelection.bind(this);
        this.handleCondition = this.handleCondition.bind(this);
        this.handleResult = this.handleResult.bind(this);

        this.handleNestChoice = this.handleNestChoice.bind(this);
        this.handleNestSubmit = this.handleNestSubmit.bind(this);
    }

    handleNext(e) {
        const { name } = e.target;
        if(this.state.selectedAge!==""){
            this.setState(() => ({
                activeSection: name
            }));
        }
    }
    handleAgeSelection(e) {
        const { id } = e.target;
        this.setState({selectedAge: id});
    }
    handleBack(e) {
        const { name } = e.target;
        this.setState(() => ({
            activeSection: name,
            condition: ["", "", "", "", ""],
            showAlert: false
        }));
    }
    handleCondition(e) {
        const { id } = e.target;
        const x = id.charAt(1);
        const i = parseInt(e.target.name);
        let isCompleted = true;
        const list = this.state.condition.map((item, j) => {
            if (item===""){
                isCompleted = false;
            }
            if (j === i) {
              return x;
            } else {
              return item;
            }
          });
        this.setState(() => ({
            condition: list,
            completion: isCompleted
        }));
        console.log(this.state.condition);
    }
    handleResult() {
        let isCompleted = true;
        let healthy = true;
        let unknown = false;
        this.state.condition.map((item) => {
            if (item === "") {
                isCompleted = false;
            }
            if (item != "1" && item != "0"){
                healthy = false;
            }
            else if (item === "0" ){
                unknown = true;
            }
        });
        if(isCompleted === true){
            this.setState(() => ({
                completion: true,
                showAlert: false
            }));
            if(healthy===false){
                this.setState(() => ({
                    result: unwellResult,
                    activeSection: "result"
                }));
            }
            else if(unknown===true){
                this.setState(() => ({
                    result: unableToDetermine,
                    activeSection: "result"
                }));
            }
            else if(healthy===true){
                if(this.state.selectedAge==="newborn"){
                    this.setState(() => ({activeSection: "environmentcheck"}));
                }
                else if(this.state.selectedAge==="chick"){
                    this.setState(() => ({activeSection: "environmentcheck"}));
                }
                else{
                    this.setState(() => ({result: healthyAdultResult}));
                    this.setState(() => ({activeSection: "result"}));
                }
            }
        }
        else{
            this.setState({showAlert: true});
        }
    }

    handleNestChoice(e) {
        const { id } = e.target;
        const { name } = e.target;
        if(name==="nest"){
            if(id==="t0"){
                this.setState({nest: true})
            }
            else{
                this.setState({nest: false})
            }
        }
        else{
            if(id==="t1"){
                this.setState({canReturn: true})
            }
            else{
                this.setState({canReturn: false})
            }
        }
        console.log(this.state.nest, this.state.canReturn);
    }
    handleNestSubmit() {
        if(this.state.nest!==null && this.state.canReturn!==null){
            this.setState({activeSection: "result"})
            if(this.state.nest===true && this.state.canReturn===true){
                this.setState({result: healthyNestResult})

            }
            else if(this.state.nest===true && this.state.canReturn===false){
                this.setState({result: healthyNestResult})
            }
            else {
                this.setState({result: healthyNoNestResult})
            }
        }
    }

    render() {
        return (
            <div>
                <SelectAge activeSection={this.state.activeSection} onNext={this.handleNext} onAgeSelect={this.handleAgeSelection}/>
                <HealthCheck activeSection={this.state.activeSection} onBack={this.handleBack} condition={this.state.condition} onSubmit={this.handleResult} onConditionSelect={this.handleCondition}/>
                <EnvironmentCheck activeSection={this.state.activeSection} instruction={this.state.instruction} onSelect={this.handleNestChoice} onSubmit={this.handleNestSubmit}/>
                <Result activeSection={this.state.activeSection} result={this.state.result} onBack={this.handleBack}/>
                <Map activeSection={this.state.activeSection}/>
                <UnfinAlert activeSection={this.state.activeSection} alert={this.state.showAlert}/>
            </div>
        );
    }
}