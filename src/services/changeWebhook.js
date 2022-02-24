import axios from 'axios'

const urlChangeWebhook = window.location.origin +"/updateSMSwebhook";
const urlWebhook =window.location.origin + "/inboundMessages";

const changeWebhook = (pwd, numberID) =>{
    const params = new URLSearchParams();
    params.append('pwd', pwd);
    params.append('SmsUrl', urlWebhook);
    params.append('phoneNumberID', numberID);
    console.log(urlWebhook)
    const request = axios.post(urlChangeWebhook,params);
    return request.then(response => {
        return {...response.data, "urlNewWebhook": urlWebhook}});

}

export default changeWebhook;