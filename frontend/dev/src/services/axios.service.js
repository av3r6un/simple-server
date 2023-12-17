import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';

const request = axios.create({
  baseURL: '/api',
});

request.interceptors.request.use(
  (config) => {
    const accsToken = authHeader();
    // eslint-disable-next-line
    config.headers.Authorization = accsToken.Authorization;
    return config;
  },
  err => Promise.reject(err),
);

async function refreshAccessToken() {
  return AuthService.refresh(authHeader('refresh'));
}

request.interceptors.response.use(
  resp => resp.data,
  async (err) => {
    const originalRequest = err.config;
    // eslint-disable-next-line
    if (err.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return request(originalRequest);
      }
    }
    return Promise.reject(err);
  },
);

export default request;
