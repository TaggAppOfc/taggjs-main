import Auth from './auth.js';
import Env from './env.js';
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
            reconnectionDelayMax: 60000
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            this._ws.once("connect_error", (err) => {
                this._ws.removeAllListeners();
                reject(err);
            });

            this._ws.once("connect", (data) => {
                this._ws.removeAllListeners();
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
        GetTips: Env.GetTips
    }
}

export default Tagg;