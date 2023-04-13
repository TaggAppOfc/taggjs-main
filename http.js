import axios from "axios";
import {GetAPI} from './env';

export function Get(path = '/') {
    const Caller = axios.create({
        baseURL: GetAPI(),
    });

    return Caller.get(path);
}

export function Post(path = '/', data ={}) {
    const Caller = axios.create({
        baseURL: GetAPI(),
    });

    return Caller.post(path, data);
}