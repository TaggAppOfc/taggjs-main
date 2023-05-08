import Auth from './auth.js';
import Env from './env.js';
import Register from './register.js';
import io from 'socket.io-client';

class Client {
    constructor(token = '') {
        this.token = token;
        this._ws = io(Env.GetGateway(), {
            auth: {
                token
            },
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 60000,
        });
    }

    get connected() {
        if(!this._ws) return false;
        return this._ws.connected;
    }

    emit(eventName, ...args) {
        if(this._ws) this._ws.emit(eventName, ...args);
    }

    on(eventName, callback) {
        if(this._ws) this._ws.on(eventName, callback);
    }

    off(eventName, callback) {
        if(this._ws) this._ws.off(eventName, callback);
    }

    login() {
        return new Promise((resolve, reject) => {
            this._ws.once("connect_error", (err) => {
                reject(err);
            });

            this._ws.once("connect", (data) => {
                resolve(data);
            });
 
            this._ws.connect();
        })
    }
}

const Tagg = {
    Client,
    API: {
        Login: Auth.LoginUser,
        GetTips: Env.GetTips,
        GetTags: Env.GetTags,
        Register
    }
}

export default Tagg;