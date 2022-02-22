import axios from 'axios'

const urlChangeWebhook = "/updateSMSwebhook";
const urlWebhook = "/inboundMessages";

const changeWebhook = (pwd, numberID) =>{
    const params = new URLSearchParams();
    params.append('pwd', pwd);
    params.append('SmsUrl', urlWebhook);
    params.append('phoneNumberID', numberID);
    
    const request = axios.post(urlChangeWebhook,params);
    return request.then(response => {
        return {...response.data, "urlNewWebhook": urlWebhook}});

}

export default changeWebhook;