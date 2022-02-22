import axios from 'axios'

const urlToken = '/tokenGeneration';



const getToken = (identity) =>{
    const url = `${urlToken}?identity=${encodeURIComponent(identity)}`

    const response = axios.get(url)
    return response.then(data => data.data);

};



export default getToken;