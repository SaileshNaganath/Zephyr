import axios from 'axios';
import {API_BASE_URL,API_TIMEOUT} from "./Config";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept']='application/json';

export const Axios = axios.create ({
    baseURL:API_BASE_URL,
    timeout:API_TIMEOUT
})
