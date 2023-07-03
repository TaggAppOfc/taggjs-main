import Auth from "./auth.js";
import Env from "./env.js";
import HTTP from "./http.js";
import Register from "./register.js";
import io from "socket.io-client";

class Client {
  constructor() {
    this._ws = io(Env.GetGateway(), {
      auth: {},
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 60000,
    });

    this.user = null;

    this._ws.on("USER", (data) => {
      if (this.user) {
        if (this.user.id != data.id) return;
        this.user = {
          ...this.user,
          ...data,
        };
      } else this.user = data;
    });
  }

  set location(value) {
    this._ws.auth = {
        ...this._ws.auth,
        ...value
    }
}

get location() {
    return {
        os: this._ws.auth['os'],
        client: this._ws.auth['client'],
    }
}

  set token(value) {
    this._token = value;
    this._ws.auth["token"] = value;
  }

  get token() {
    return this._token;
  }

  get connected() {
    if (!this._ws) return false;
    return this._ws.connected;
  }

  emit(eventName, ...args) {
    if (this._ws) this._ws.emit(eventName, ...args);
  }

  on(eventName, callback) {
    if (this._ws) this._ws.on(eventName, callback);
  }

  off(eventName, callback) {
    if (this._ws) this._ws.off(eventName, callback);
  }

  login() {
    return new Promise((resolve, reject) => {
      this._ws.once("connect_error", (err) => {
        reject(err);
      });

      this._ws.once("connect", (data) => {
        resolve(data);
      });

      this._ws.connect();
    });
  }

  get httpHeaders() {
    return {
      authorization: this.token,
    };
  }

  setAvatar(image) {
    const form = new FormData();
    form.append("upload", image);
    return HTTP.Post("/user/avatar", form, this.httpHeaders);
  }

  setBanner(image) {
    const form = new FormData();
    form.append("upload", image);
    return HTTP.Post("/user/banner", form, this.httpHeaders);
  }

  saveProfile(saveData) {
    return HTTP.Post("/user/profile", saveData, this.httpHeaders);
  }

  followUser(id) {
    return HTTP.Get(`/user/profile/${id}/follow`, this.httpHeaders);
  }

  getUserProfile(id) {
    return HTTP.Get(`/user/profile/${id}/`, this.httpHeaders);
  }

  getFriendList() {
    return HTTP.Get(`/user/friends/`, this.httpHeaders);
  }

  getNotifications() {
    return HTTP.Get(`/user/notifications/`, this.httpHeaders);
  }

  getDevices() {
    return HTTP.Get(`/user/devices/`, this.httpHeaders);
  }

  removeDevice(idSession) {
    return HTTP.Post(`/user/devices/${idSession}/delete`, {}, this.httpHeaders);
  }

  createPost(idTag, postContent, attachments = []) {
    const form = new FormData();
    form.append("tagId", idTag);
    form.append("content", postContent);
    form.append("files", attachments);
    return HTTP.Post("/post/create", form, this.httpHeaders);
  }

  clearNotifications() {
    return HTTP.Post("/notifications/clear", {}, this.httpHeaders);
  }

  clearNotification(idNotification) {
    return HTTP.Post("/notifications/clear", {idNotification}, this.httpHeaders);
  }

  getTag(idTag) {
    return HTTP.Get("/tags/" + idTag, this.httpHeaders);
  }
}

const Tagg = {
  Client,
  API: {
    Login: Auth.LoginUser,
    GetTips: Env.GetTips,
    GetTags: Env.GetTags,
    Register,
  },
};

export default Tagg;
