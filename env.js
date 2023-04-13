let CURRENT_API = 'https://api.tagg.chat/v1';

export function ChangeAPI(url = '') {
    CURRENT_API = url;
}

export function GetAPI() {
    return CURRENT_API;
}