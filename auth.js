const {Get} = require('./http');

export function LoginUser(username, password) {
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