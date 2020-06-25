import axios from 'axios';
import Cookies from 'universal-cookie';

// let ENV = 'dev';
let ENV = 'prod';
const url = ENV == 'dev' ? 'http://127.0.0.1:8000/' : 'https://api.1eastar.com/';

const genAuthorizedHeader = () => {
    const cookie = new Cookies();
    const config = {
        headers: {
            'X-User-Token': cookie.get('token'),
        }
    };
    return config;
}

export const get = (link: string) => {
    return axios.get(url+link);
}

export const getWithToken = (link: string) => {
    const config = genAuthorizedHeader();
    return axios.get(url+link, config);
}

export const post = (link: string, data: object) => {
    const config = genAuthorizedHeader();
    return axios.post(url+link, data, config);
}

export const postWithoutToken = (link: string, data: object) => {
    return axios.post(url+link, data);
}