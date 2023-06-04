import axios from 'axios';
import Env from './env.js';

function Get(path = '/', headers ={}) {
    console.log(axios);

    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers
    });

    return Caller.get(path);
}

function Post(path = '/', data ={}, headers ={}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers
    });

    return Caller.post(path, data);
}

const HTTP = {
    Get,
    Post
}

export default HTTP;