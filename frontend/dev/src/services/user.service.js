import axios from 'axios';
import authHeader from './auth-header';


class UserService {
  async getMe() {
    this.msg = '';
    if (localStorage.getItem('_auth')) {
      return axios
        .get('/auth/get-me', { headers: authHeader('main') })
        .then((resp) => {
          if (resp.data.status === 'success' && resp.data.granted) {
            this.msg = 'granted';
          }
          return this.msg;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            if (err.response.data.msg === 'TNF') {
              this.msg = 'auth';
            } else if (err.response.data.msg === 'THE') {
              this.msg = this.refresh();
            }
          }
        });
    }
    return this.msg;
  }

  async refresh() {
    this.user = JSON.parse(localStorage.getItem('_auth'));
    return axios
      .post('/auth/refresh', {}, { headers: authHeader('refresh') })
      .then((resp) => {
        if (resp.data.status === 'success') {
          this.user.accs_token = resp.data.token;
          location.reload();
        }
        localStorage.setItem('_auth', JSON.stringify(this.user));
        this.msg = 'granted';
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.msg === 'THE') {
          this.msg = 'auth';
          localStorage.removeItem('_auth');
        }
      })
      .finally(() => this.msg);
  }
}

export default new UserService();
