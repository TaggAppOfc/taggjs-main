import HTTP from "./http.js";

let CURRENT_API = 'https://api.tagg.chat/v1';
let CURRENT_GATEWAY = 'https://gateway.tagg.chat';

function ChangeAPI(url = '') {
    CURRENT_API = url;
}

function GetAPI() {
    return CURRENT_API;
}

function GetGateway() {
    return CURRENT_GATEWAY;
}

async function GetTips() {
    const Data = await HTTP.Get("/tips");

    const Result = {
        tips: []
    }

    if(Data.status === 200) {
        Result.tips = Data.data.result;
    }

    return Result;
}

const Env = {
    ChangeAPI,
    GetAPI,
    GetTips,
    GetGateway
}

export default Env;