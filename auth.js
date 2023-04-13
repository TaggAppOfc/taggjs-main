import HTTP from './http.js';

function LoginUser(username, password) {
    return new Promise((resolve, reject) => {
        HTTP.Post("/auth/login", {username, password}).then((response) => {
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