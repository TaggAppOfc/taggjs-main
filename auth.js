const {Get} = require('./http');

function LoginUser(username, password) {
    return new Promise((resolve, reject) => {
        Get("/auth/login").then((response) => {
            const response = {
                statusCode: response.status,
                token: response.data.token
            }

            resolve(response);
        }).catch((err) => {
            reject(err);
        })
    }) 
}

module.exports = {
    LoginUser
}