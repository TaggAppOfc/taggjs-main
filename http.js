const axios = require('axios').default;
const Env = require('./env');

export function Get(path = '/') {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
    });

    return Caller.get(path);
}

export function Post(path = '/', data ={}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
    });

    return Caller.post(path, data);
}