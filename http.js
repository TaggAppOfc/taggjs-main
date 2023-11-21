import axios from 'axios';
import Env from './env.js';

function Get(path = '/', headers ={}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers
    });

    return Caller.get(path);
}

function Post(path = '/', data ={}, headers ={}, config ={}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers,
        ...config
    });

    return Caller.post(path, data);
}

function PostForm(path = '/', data ={}, headers ={}, config ={}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers,
        ...config
    });

    return Caller.postForm(path, data);
}

function Delete(path = '', headers = {}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers
    });

    return Caller.delete(path);
}

const HTTP = {
    Get,
    Post,
    Delete,
    PostForm
}

export default HTTP;