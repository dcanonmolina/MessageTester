import React, { useState } from 'react'
import sendMessage from '../services/sendMessage'
import changeWebhook from '../services/changeWebhook'
import utilities from '../utilities/utilities'
import '../indexTxt.css'





const PanelMessaging = (props) =>{
    
    const [fromNumber, setFromNumber] = useState("empty")
    const [message, setMessage] = useState("");
    const [checkedWA, setCheckedWA] = useState(false);
    const [toNumber, setToNumber] = useState("");
    const [webhook, setWebhook] = useState("")
    

    const sendMessageClick = (pwd) =>{

        if(fromNumber ==="empty")
        {
            return alert("select a From phone number");
        }
    
        if(message===""){
            return alert("Message is empty");
        }
    
        if(!utilities.validatePhoneForE164(toNumber)){
            return alert("To number invalid");
        }
    
        sendMessage(pwd,fromNumber, toNumber, message, checkedWA)
            .then(data => alert("Message SID " + data.messageSID ));
    
    }
    
    const handleFromNumChange =(event) =>{
        const newFromNumber = event.target.value;
        setFromNumber(event.target.value)

        const dataFromNumber = props.data.filter(phone => phone.number ===newFromNumber);
        if(dataFromNumber){
          console.log(dataFromNumber)
          setWebhook(dataFromNumber[0].webhook);
        }
          
    }

    const changeWebhookClick = (pwd) =>{
      if(fromNumber ==="empty")
      {
          return alert("select a From phone number");
      }

      const fromNumberArray = props.data.filter(phone => phone.number ===fromNumber);

      changeWebhook(pwd, fromNumberArray[0].phoneNumberID)
        .then(data => {

          setWebhook(data.urlNewWebhook);
          
          props.data.forEach(val =>{
              if(val.number === fromNumberArray[0].phoneNumberID){
                  val.webhook = data.urlWebhook;
              }
          });

        });

    }
    
    const handleWebhookChange = () => {

    }

    const handleCheckChange = () => {
        setCheckedWA(!checkedWA);
      };
    const handleMessageChange =(event) =>{
        setMessage(event.target.value)
    }
    
    const handleToNumberChange =(event) =>{
        setToNumber(event.target.value)
    }

    return (
      <div className="wrapper">
        <div style={{gridColumn:"1",gridRow:"1"}}>
          <label htmlFor="numbers">Phone numbers:</label>
          <select name="numbers" id="numbers" value={fromNumber} onChange={handleFromNumChange}>
          <option key='0' value="empty"> </option>
          {
              props.data.map(i =><option key={i.number} value={i.number}>{i.number}</option>)
          }
          </select>
          <div className="blockLine">
            <input type="checkbox" id="cboxWhatsapp" value="second_checkbox" checked={checkedWA} onChange={handleCheckChange}></input>
            <label htmlFor="cboxWhatsapp">Es Whatsapp</label>
          </div>
        </div>
        <div style={{gridColumn:"2",gridRow:"1"}}> 
          To<input id="txtToNumber" type="text" value={toNumber} onChange={handleToNumberChange}/>
        </div>
        <div style={{gridColumn:"1 / span 2", gridRow:"2"}}>
            <label htmlFor="txtMessagingWebhook">Current webhook:</label>
            <input id="txtMessagingWebhook" type="text" className="halfWidth" value={webhook} onChange={handleWebhookChange} disabled/>
            <button id="setWebhookToApp" onClick={() => changeWebhookClick(props.password)}>Change to local app</button>
        </div>
        <div style={{gridColumn:"1 / span 2",gridRow:"3"}}>
            <p>Message</p>
            <textarea id="txtMessage" name="w3review" className="txtMessage" value={message} onChange={handleMessageChange} ></textarea>
        </div>
        <div style={{gridColumn:"1 / span 2",gridRow:"4"}} >
            <button id="sendMessage" onClick={() => sendMessageClick(props.password)}>Send</button>
        </div>
      </div>
    )
  }


export default PanelMessaging;