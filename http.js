const axios = require('axios');
const Env = require('./env');

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

module.exports = {
    Get,
    Post
}