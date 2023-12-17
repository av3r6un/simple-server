import axios from 'axios';
import authHeader from './auth-header';

class AuthService {
  async login(user) {
    this.smth = null;
    return axios
      .post('/auth/', user)
      .then((resp) => {
        if (resp.data.status === 'success') {
          localStorage.setItem('_auth', JSON.stringify(resp.data.body));
        }
        return resp.data.body;
      })
      .catch(err => console.log(err));
  }

  async logout() {
    this.msg = null;
    return axios
      .get('/auth/logout', { headers: authHeader('main') })
      .then(resp => resp.data.message)
      .catch(err => console.error(err))
      .finally(() => {
        localStorage.removeItem('_auth');
        location.reload();
        return this.msg;
      });
  }

  async register(user) {
    this.smth = null;
    return axios
      .post('/auth/register/', user)
      .then(resp => resp.data.message)
      .catch(err => console.error(err));
  }

  async refresh(user) {
    this.smth = null;
    return axios
      .post('/auth/refresh', {}, { headers: user })
      .then((resp) => {
        let token = null;
        if (resp.data.token) {
          token = resp.data.token;
          this.user = JSON.parse(localStorage.getItem('_auth'));
          this.user.accs_token = resp.data.token;
          localStorage.setItem('_auth', JSON.stringify(this.user));
        }
        return token;
      })
      .catch(err => console.error(err));
  }
}

export default new AuthService();
