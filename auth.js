import HTTP from './http.js';

function LoginUser(username, password) {
    return new Promise((resolve, reject) => {
        HTTP.Get("/auth/login").then((response) => {
            resolve({
                statusCode: response.status,
                token: response.data.token
            });
        }).catch((err) => {
            reject(err);
        })
    }) 
}

const Auth = {
    LoginUser,
}

export default Auth;