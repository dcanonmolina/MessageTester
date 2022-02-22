import axios from 'axios'

const urlPassword = "/validateAndList?pwd=";


const checkPassword = (pwd) =>{
    const urlPass = urlPassword + pwd;

    const request = axios.get(urlPass);
    return request.then(response => response.data);
}

export default checkPassword;