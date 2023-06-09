import React from 'react';
import { Form, Button, Alert, Accordion, ButtonGroup } from 'react-bootstrap';
import { Title, imgOption, optionGroup, ShowMap } from './QuickGuide';
import "./QuickGuide.css";

import Cat from "./img/QGCat/cat.jpg";
import Kitten from "./img/QGCat/Kitten.png";
import Adult_cat from "./img/QGCat/adult_cat.jpeg";
import Special_cat from "./img/QGCat/special_cat.jpg";

const age = [
    {id:'newborn', label:'幼貓', img:Kitten}, 
    {id:'adult', label:'成貓', img:Adult_cat},
    {id:'special', label:'疑似特殊品種貓', img:Special_cat}
];
const group0 = [
    {label:'未發現', id:'01'}, 
    {label:'有開放性傷口', id:'02'}, 
    {label:'嚴重皮膚病', id:'03'}, 
    {label:'流血不止', id:'04'}, 
    {label:'以上皆有', id:'05'}, 
];
const group1 = [
    {label:'正常', id:'11'}, 
    {label:'無意識', id:'12'}, 
    {label:'換氣困難、呼吸急迫', id:'13'}, 
    {label:'痛苦嚎叫', id:'14'}, 
];
const group2 = [
    {label:'正常', id:'21'}, 
    {label:'冷/涼', id:'22'}, 
    {label:'失溫', id:'23'}, 
    {label:'嚴重發燙', id:'24'}, 
];
const group3 = [
    {label:'正常', id:'31'}, 
    {label:'營養不良、異常消瘦', id:'32'}, 
    {label:'無法自行移動', id:'33'}, 
];
const group4 = [
    {label:'無', id:'41'}, 
    {label:'其他狀態(可能需要照顧)', id:'42'}, 
];
const healthyNewbornResult_cat = [
    "健康小貓!",
    "如果你遇到一隻健康的流浪小貓，是否應該將它送到動物收容所取決於你的個人情況和當地的實際情況。以下是一些考慮因素：",
    "1. 年齡和自理能力：流浪小貓通常需要更多的關注和照顧，特別是在幼年時期。如果小貓太小無法自理，缺乏親代照顧或還需要母乳餵養，最好將它送到動物收容所或尋求獸醫的協助。幼小的貓需要特別的照料和餵養，以確保它們的健康和發展。",
    "2. 資源和能力：在決定是否將小貓帶到動物收容所之前，請考慮你的資源和能力。飼養小貓需要時間、金錢和精力的投入。你需要提供適當的食物、水、溫暖的住所和醫療照護。請確保你有足夠的資源來養育和照顧小貓，包括長期關注和可能的費用。",
    "3. 預防措施：如果你決定將小貓送到動物收容所，請確保它們符合當地的收容所要求。有些收容所可能需要預約或有特定的收費標準。在抵達收容所之前，也可以與當地的收容所聯繫，了解他們的政策和程序。",
    "4. 領養選項：流浪小貓通常需要一個永久的家庭。如果你無法提供長期的照顧，你可以考慮幫助尋找合適的領養家庭。與當地的動物保護組織聯繫，尋求領養或領養送養計劃的幫助。",
    "重要的是，確保小貓獲得適當的照顧和關注。如果你有疑問，最好諮詢當地的動物控制部門、動物收容所或動物保護組織的專業意見。他們可以提供有關當地政策、資源和其他可行選項的信息。",
];
const healthyAdultResult_cat = [
    "健康小貓",
    "如果你遇到一隻健康的流浪貓，是否應該將它送到動物收容所取決於你的個人情況和當地的實際情況。以下是一些考慮因素：",
    "1. 慎重考慮：在將流浪貓帶到動物收容所之前，請慎重考慮你的動機和能力。收容所通常是為無家可歸的、受傷或需要幫助的動物提供臨時庇護的地方。如果貓看起來健康、友善且能夠自理，它可能是一隻居住在室外的流浪貓，而不是需要立即進入收容所的情況。",
    "2. 尋找主人：如果貓看起來健康並且有友善的態度，它可能是有家的寵物，而不是流浪貓。你可以試著尋找貓的主人，例如張貼走失貓的海報、在社交媒體上發布資訊，或者通過當地的寵物失蹤報告系統尋找線索。",
    "3. TNR計劃：如果你遇到流浪貓並且無法找到主人，你可以考慮參與TNR（Trap-Neuter-Return）計劃。這是一種針對流浪貓的人道管理方法，其中貓被捕捉、結紮/節育，然後回到原來的居住地。這有助於控制流浪貓數量並改善社區的貓群健康。",
    "4. 諮詢專業意見：如果你仍然不確定是否將流浪貓送到動物收容所，最好諮詢當地的動物控制部門、收容所或動物保護組織的專業意見。他們可以提供有關當地政策、資源和其他可行選項的信息。",
    "請記住，每個地區的情況可能有所不同，而且對流浪貓的處理方法也會有所不同。最重要的是確保流浪貓的安全和福祉，並遵守當地的法律和規定。",
];
const unwellResult_cat = [
    "貓咪需要救援!",
    "當你遇到生病或受傷的貓時，以下是你可以採取的步驟：",
    "1. 保持安全距離：貓可能對陌生人感到害怕或不安。在接近受傷或生病的貓時，保持安全距離，並避免做出突然的動作或發出嘈雜聲音，以免驚嚇到貓。",
    "2. 評估情況：觀察貓的狀態，確定它是否需要立即的醫療幫助。如果貓的情況嚴重或你對如何處理不確定，最好尋求獸醫的專業建議和幫助。",
    "3. 使用安全容器：如果貓允許接觸，將它放置在一個安全、溫暖且安靜的容器中。使用一個適當大小的盒子或籠子，加上柔軟的床墊（如毛巾或紙巾），提供貓一個舒適的環境。確保容器有通風孔，避免直接曝露於陽光下。",
    "4. 減少干擾：將貓放置在安全容器後，減少與其接觸和干擾。保持容器的環境安靜、溫暖且暗淡，遠離其他動物和干擾。",
    "5. 聯繫獸醫：盡快聯繫當地的獸醫診所或緊急動物醫療服務。提供他們有關貓的狀況和位置的詳細信息，並遵從他們的指示。獸醫將能夠提供適當的診斷和治療。",
    "6. 不要試圖自行治療：在沒有相關訓練和知識的情況下，不要試圖自行治療貓的傷病。使用不適當的方法或藥物可能對貓造成更大的傷害。將這方面的專業治療交給經驗豐富的獸醫。",
    "請記住，處理受傷或生病的貓需要謹慎和專業知識。尋求獸醫的幫助是最佳的選擇，以確保貓獲得適當的醫療和照",
];
const unableToDetermine_cat = ["目前無法辨別貓的狀態，建議先帶至獸醫院檢查!"];

function QGCat(){
    return(
        <div>
            {Title(Cat, "Cats", "傷救指引：貓")}
=            <Bird/>
        </div>
    );
}
export default QGCat;

class UnfinAlert extends React.Component {
    render() {
        if(this.props.alert===true && this.props.activeSection === "healthcheck"){
            return(
                <div align="center"><div className="box"><Alert variant="danger">表格未完成！</Alert></div></div>
            );
        }
    }
}
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
                <Button name="healthcheck" onClick={this.props.onNext}>Next</Button>
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
                <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
                    {optionGroup("目視外傷", "0", group0, this.props.onConditionSelect)}
                    {optionGroup("精神狀況", "1", group1, this.props.onConditionSelect)}
                    {optionGroup("體溫狀態", "2", group2, this.props.onConditionSelect)}
                    {optionGroup("體態", "3", group3, this.props.onConditionSelect)}
                    {optionGroup("其他", "4", group4, this.props.onConditionSelect)}
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
        if (this.props.activeSection === "result" && this.props.showMap===true) {
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
            showMap: false,
            completion: false,
            showAlert: false
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleAgeSelection = this.handleAgeSelection.bind(this);
        this.handleCondition = this.handleCondition.bind(this);
        this.handleResult = this.handleResult.bind(this);
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
        this.setState({
            selectedAge: id
        });
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
            if (item !== "1" && item !== "0"){
                healthy = false;
            }
            else if (item === "0" ){
                unknown = true;
            }
        });
        if(isCompleted === true){
            this.setState(() => ({
                completion: true,
                activeSection: "result",
                showAlert: false
            }));
            if(healthy===false){
                this.setState({
                    result: unwellResult_cat,
                    showMap: true,
                });
            }
            else if(unknown===true){
                this.setState({result: 
                    unableToDetermine_cat,
                    showMap: true,
                });
            }
            else if(healthy===true){
                if(this.state.selectedAge==="newborn"){
                    this.setState({result: healthyNewbornResult_cat});
                }
                else if(this.state.selectedAge==="adult"){
                    this.setState(() => ({result: healthyAdultResult_cat}));
                }
            }
        }
        else{
            this.setState({showAlert: true});
        }
    }

    render() {
        return (
            <div>
                <SelectAge activeSection={this.state.activeSection} onNext={this.handleNext} onAgeSelect={this.handleAgeSelection}/>
                <HealthCheck activeSection={this.state.activeSection} onBack={this.handleBack} condition={this.state.condition} onSubmit={this.handleResult} onConditionSelect={this.handleCondition}/>
                <Result activeSection={this.state.activeSection} result={this.state.result} onBack={this.handleBack}/>
                <Map activeSection={this.state.activeSection} showMap={this.state.showMap}/>
                <UnfinAlert activeSection={this.state.activeSection} alert={this.state.showAlert}/>
            </div>
        );
    }
}