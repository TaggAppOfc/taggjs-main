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

function DoRegister(user, profile, avatar, banner) {
    return new Promise((resolve, reject) => {
        const form = new FormData();

        form.append("user", JSON.stringify(user));
        form.append("profile", JSON.stringify(profile));
        form.append("avatar", avatar);
        form.append("banner", banner)

        HTTP.Post("/register/", form).then((response) => {
            resolve({
                statusCode: response.status,
                token: response.data.token
            });
        }).catch((err) => {
            reject(err);
        })
    }) 
}

const Register = {
    EmailAvailable,
    UsernameAvailable,
    DoRegister
}

export default Register;