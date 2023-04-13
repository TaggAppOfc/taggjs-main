import axios from 'axios';
import Env from './env.js';

function Get(path = '/') {
    console.log(axios);

    const Caller = axios.create({
        baseURL: Env.GetAPI(),
    });

    return Caller.get(path);
}

function Post(path = '/', data ={}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
    });

    return Caller.post(path, data);
}

const HTTP = {
    Get,
    Post
}

export default HTTP;