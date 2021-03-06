import axios from "axios";

class DataService {
  constructor(
    url = "https://socialapp-api.herokuapp.com",
    client = axios.create()
  ) {
    this.url = url;
    this.client = client;
  }
  createnewuser(userdata) {
    console.log(userdata);
    return this.client.post(this.url + "/users", userdata);
  }

  getLoginForm() {
    return this.client.post(this.url + "/login");
  }

  getLogout() {
    return this.client.post(`${this.url}/logout`);
  }

  posttlike(messageId) {
    const data = { messageId };
    const config = {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
    return this.client
      .post(this.url + "/likes", data, config)
      .then((respose) => {
        return respose.data;
      });
  }
  getToken() {
    const loginData = JSON.parse(localStorage.getItem("login"));
    const { token } = loginData.result;
    return token;
  }
  getMessages(limit = 20) {
    return this.client.get(this.url + "/messages?limit=" + limit);
  }

  getMoreMessages(offset = 20, limit = 20) {
    return this.client.get(
      this.url + "/messages?offset=" + offset + "&limit=" + limit
    );
  }

  deleteuser() {
    const loginData = JSON.parse(localStorage.getItem("login")).result;

    return this.client.delete(this.url + `/users/${loginData.username}`, {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }

  createMessage(text) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    return this.client.post(
      this.url + "/messages",
      { text },
      {
        headers: { Authorization: `Bearer ${loginData.token}` },
      }
    );
  }

  deleteMessage(messageId) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    return this.client.delete(this.url + "/messages/" + messageId, {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }
  getMessage(messageId) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    return this.client.get(this.url + "/messages/" + messageId, {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }
  deletelikes(likeId) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    return this.client.delete(this.url + "/likes/" + likeId, {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }

  getPicture(username) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    return this.client.get(this.url + "/users/" + username + "/picture", {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }
  setPicture(username) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    return this.client.put(this.url + "/users/" + username + "/picture", {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }
  userUpdate(userData) {
    const loginData = JSON.parse(localStorage.getItem("login")).result;
    const username = loginData.username
    return this.client.patch(this.url + "/users/" + username, userData, {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
  }
  getUser(username) {
    console.log(username);
    return this.client.get(this.url + "/users/" + username);
  }
  setuserphoto(formdata) {
    return this.client.put(this.url + "/users", formdata);
  }
}

export default DataService;
