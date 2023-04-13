let CURRENT_API = 'https://api.tagg.chat/v1';

function ChangeAPI(url = '') {
    CURRENT_API = url;
}

function GetAPI() {
    return CURRENT_API;
}

const Env = {
    ChangeAPI,
    GetAPI
}

export default Env;