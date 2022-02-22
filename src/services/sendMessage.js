import axios from 'axios'

const urlSMS = "/sendSMS";

const sendMessage = (pwd, from, to, message, isWhatsapp) =>{

    const params = new URLSearchParams();
    params.append('pwd', pwd);
    params.append('From', (isWhatsapp ? "whatsapp:" : "") + from);
    params.append('To', (isWhatsapp ? "whatsapp:" : "") + to);
    params.append('Message', message);

    const request = axios.post(urlSMS,params);
    return request.then(response => response.data);

}

export default sendMessage;