const {Get} = require('./http');

function LoginUser(username, password) {
    return new Promise((resolve, reject) => {
        Get("/auth/login").then((response) => {
            resolve({
                statusCode: response.status,
                token: response.data.token
            });
        }).catch((err) => {
            reject(err);
        })
    }) 
}

module.exports = {
    LoginUser
}