import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import checkPassword from './services/validateAccess'
import PanelMessaging from './components/panelMessaging'
import PanelHistory from './components/panelHistory'
import './indexTxt.css'


function App() {
  const [ password, setPassword] = useState("");
  const [ panelvisible, setPanelVisible] = useState(false)
  const [ phonelist, setPhoneNumberList ] = useState([])
  const [ identity, setIdentity] = useState("testing")
  

  const handleTextChange = event => {
    const { name, value } = event.target;
    setPassword( value);
  }

  const handleControlVisible = () =>{

    checkPassword(password)
      .then(data =>{
        if(data){
          setPhoneNumberList(data)
          setIdentity('testing')
          setPanelVisible(!panelvisible)
          
        }
      });

  }

  return (
    <div className="App">
      <div className="milinea">
        Password
        <input id="txtPwd" type="text" onChange={handleTextChange} value={password}></input>
        <button id="sendPwd" onClick={() => handleControlVisible()}>Validate</button>
      </div>
      {panelvisible ? <div><PanelMessaging data={phonelist} password={password}/><PanelHistory identity={identity}/></div>:null}

    </div>
  );
}



export default App;
