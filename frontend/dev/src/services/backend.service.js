import axios from 'axios';
import request from './axios.service';


class Backend {
  msg = null;

  manageResp(resp) {
    let result = null;
    if (resp.status === 'success') {
      this.msg = resp.message ? resp.message : '';
      result = resp.body ? resp.body : null;
    } else {
      this.msg = resp.message;
    }
    return result;
  }

  async get(url, parameters = null) {
    return request
      .get(url, { params: parameters })
      .then(resp => this.manageResp(resp))
      .catch(err => console.error(err));
  }

  async post(url, data) {
    return request
      .post(url, data)
      .then(resp => this.manageResp(resp))
      .catch(err => console.error(err));
  }

  async delete(url, data = {}) {
    return request
      .delete(url, data)
      .then(resp => this.manageResp(resp))
      .catch(err => console.error(err));
  }

  async put(url, data = {}) {
    return request
      .put(url, data)
      .then(resp => this.manageResp(resp))
      .catch(err => console.error(err));
  }

  static async external(uri, met, parameters, heads, json) {
    delete axios.defaults.headers.common.Authorization;
    return axios({
      method: met,
      url: uri,
      params: parameters,
      headers: heads,
      data: json,
    })
      .then(resp => resp.data)
      .catch(err => console.error(err));
  }
}

export default Backend;
