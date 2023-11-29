import axios from 'axios';
import Env from './env.js';

function Get(path = '/', headers = {}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers
    });

    return Caller.get(path);
}

function Post(path = '/', data = {}, headers = {}, config = {}) {
    const Caller = axios.create({
        baseURL: Env.GetAPI(),
        headers,
        ...config
    });

    return Caller.post(path, data);
}

function PostForm(path = '/', data, headers = {}, config = {}) {
    return sendXmlHttpRequest(path, data, headers, config);
}


function sendXmlHttpRequest(path, data, headers, config) {
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = e => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200 || xhr.status === 201) {
                resolve({
                    status: xhr.status,
                    data: JSON.parse(xhr.responseText)
                });
            } else {
                reject(xhr);
            }
        };
        xhr.onprogress = e => {
            if (e.lengthComputable) {
                const percentage = (e.loaded / e.total) * 100;
                if (config.onUploadProgress) {
                    config.onUploadProgress({
                        progress: percentage
                    })
                }
            }
        }
        xhr.open("POST", Env.GetAPI() + path);
        const headersKeys = Object.keys(headers);
        for (const key of headersKeys) {
            xhr.setRequestHeader(key, headers[key]);
        }
        xhr.send(data);
    });
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