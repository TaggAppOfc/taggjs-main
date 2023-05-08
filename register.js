import HTTP from "./http.js";

function EmailAvailable(email) {
    return new Promise((resolve, reject) => {
        HTTP.Get("/register/emailavailable/" + email).then((response) => {
            resolve({
                statusCode: response.status,
                value: response.data.value
            });
        }).catch((err) => {
            reject(err);
        })
    }) 
}

function UsernameAvailable(username) {
    return new Promise((resolve, reject) => {
        HTTP.Get("/register/useravailable/" + username).then((response) => {
            resolve({
                statusCode: response.status,
                value: response.data.value
            });
        }).catch((err) => {
            reject(err);
        })
    }) 
}

const Register = {
    EmailAvailable,
    UsernameAvailable
}

export default Register;