import React from 'react';
import { Form, Button, Alert, Accordion, ButtonGroup } from 'react-bootstrap';
import { Title, imgOption, optionGroup, ShowMap } from './QuickGuide';
import "./QuickGuide.css";

import puppy from "./img/QGdog/puppy.jpg";
import adult_dog from "./img/QGdog/adult_dog.jpg";
import special_dog from "./img/QGdog/special_dog.jpg";
import dog from "./img/QGdog/dog.png";

const age = [
    {id:'newborn', label:'幼犬', img:puppy}, 
    {id:'adult', label:'成犬', img:adult_dog},
    {id:'special', label:'疑似特殊品種狗', img:special_dog}
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
const healthyNewbornResult_dog = [
    "健康小狗!請注意母犬是否位於附近，否則協助送至非營利組織!",
    "是否應該將它送到動物收容所?以下是一些考慮因素：",
    "1. 資源和能力：飼養小狗需要時間、金錢和精力的投入。你需要提供適當的食物、水、住所和醫療照護。請考慮你的資源和能力是否足夠長期照顧和飼養小狗。飼養小狗需要負擔長期責任，包括訓練、社交化和醫療費用等。",
    "2. 尋找主人：如果小狗看起來健康、友善且有可能有家，你可以試著尋找它的主人。這可以通過張貼走失小狗的海報、在社交媒體上分享資訊，或通過當地的寵物失蹤報告系統尋找線索。",
    "3. 預防措施：如果你決定將小狗送到動物收容所，請確保它們符合當地收容所的要求。有些收容所可能需要預約或有特定的收費標準。在抵達收容所之前，也可以與當地的收容所聯繫，了解他們的政策和程序。",
    "4. 領養選項：流浪小狗通常需要一個永久的家庭。如果你無法提供長期的照顧，你可以考慮幫助尋找合適的領養家庭。與當地的動物保護組織聯繫，尋求領養或領養送養計劃的幫助。",
    "重要的是，確保小狗獲得適當的照顧和關注。如果你有疑問，最好諮詢當地的動物控制部門、動物收容所或動物保護組織的專業意見。他們可以提供有關當地政策、資源和其他可行選項的信息。"
];
const healthyAdultResult_dog = [
    "健康成犬! 如果你遇到一隻健康的流浪成年狗，是否應該將它帶到動物收容所還是讓它自由生活，取決於你的個人情況和當地的實際情況。以下是一些考慮因素：",
    "1. 安全問題：流浪狗在街頭生活可能面臨各種風險，包括交通事故、食物和水源不足、受傷或生病等。如果你認為該狗處於危險中，將它帶到動物收容所可能是一個更安全的選擇。",
    "2. 資源和能力：飼養一隻成年狗需要時間、金錢和精力的投入。你需要提供適當的食物、水、住所和醫療照護。請考慮你的資源和能力是否足夠長期照顧和飼養成年狗。如果你無法提供必要的照顧，將狗帶到動物收容所可能是更好的選擇。",
    "3. 尋找主人：如果狗看起來健康、友善且有可能有家，你可以試著尋找它的主人。這可以通過張貼走失狗的海報、在社交媒體上分享資訊，或通過當地的寵物失蹤報告系統尋找線索。有時狗只是暫時走失，可能已經有人在尋找它們。",
    "4. 動物收容所：如果你無法找到狗的主人或無法自己照顧它，將狗帶到動物收容所是一個選擇。動物收容所可以提供臨時庇護和尋找新家的機會。在帶狗去收容所之前，你可以與當地的收容所聯繫，了解他們的政策、程序和可能的收費。",
    "最重要的是確保狗的安全和福祉。如果你有疑問，最好諮詢當地的動物控制部門、動物收容所或動物保護組織的專業意見。他們可以提供有關當地政策、資源和其他可行選項的信息，幫助你做出適合當地情況的決策。",

];
const unwellResult_dog = [
    "狗狗需要治療!",
    "在遇到受傷或生病的狗時，以下是你可以採取的步驟：",
    "1. 確保安全：首先，請確保自己和狗的安全。如果狗對你或其他人具有攻擊性，請保持距離，並尋求專業的動物救助機構或動物控制部門的協助。如果狗是友善的，輕輕地接近它，避免突然動作或造成驚慌。",
    "2. 評估情況：觀察狗的狀態，確定它是否需要立即的醫療幫助。如果狗的情況嚴重或你對如何處理不確定，最好尋求獸醫的專業建議和幫助。",
    "3. 聯繫獸醫：盡快聯繫當地的獸醫診所或緊急動物醫療服務。提供他們有關狗的狀況和位置的詳細信息，並遵從他們的指示。獸醫將能夠提供適當的診斷和治療。",
    "4. 非急迫情況下的臨時措施：如果獸醫無法立即到達，你可以採取一些臨時措施來保護狗的安全和舒適。例如，將狗放置在安靜、溫暖且安全的區域，遠離其他動物和干擾。如果可能，使用乾淨的軟墊或毛巾墊放在狗的周圍，提供舒適的床位。",
    "5. 不要試圖自行治療：在沒有相關訓練和知識的情況下，不要試圖自行治療狗的傷病。使用不適當的方法或藥物可能對狗造成更大的傷害。將這方面的專業治療交給經驗豐富的獸醫。",
    "請記住，處理受傷或生病的狗需要謹慎和專業知識。尋求獸醫的幫助是最佳的選擇，以確保狗獲得適當的醫療和照顧。"
];
const unableToDetermine_dog = ["狗狗狀態無法確定!請送至獸醫院治療!"];
const healthySpecialResult_dog = ["特殊品種狗狗，雖然狀態健康但可能為走失犬，建議Po文幫助其找回主人!"];

function QGDog(){
    return(
        <div>
            {Title(dog, "dogs", "快速指引：狗")}
            <Main/>
        </div>
    );
}
export default QGDog;

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

class Main extends React.Component {
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
                    result: unwellResult_dog,
                    showMap: true
                });
            }
            else if(unknown===true){
                this.setState({result: 
                    unableToDetermine_dog,
                    showMap: true
                });
            }
            else if(healthy===true){
                if(this.state.selectedAge==="newborn"){
                    this.setState({result: healthyNewbornResult_dog});
                }
                else if(this.state.selectedAge==="adult"){
                    this.setState(() => ({result: healthyAdultResult_dog}));
                }
                else if(this.state.selectedAge==="special"){
                    this.setState(() => ({result: healthySpecialResult_dog}));
                }
            }
        }
        else {
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