const Auth = require('./auth');
const Env = require('./env');

class Client {
    login(token = '') {

    }
}

const Tagg = {
    Client,
    API: {
        Login: Auth.LoginUser
    }
}

module.exports = Tagg;