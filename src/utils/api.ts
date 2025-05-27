import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const refreshToken = localStorage.getItem('refreshToken');

    // accessToken이 만료되었고 재시도하지 않은 요청이라면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 accessToken 재발급 요청
        const refreshRes = await api.post('/v1/auth/refresh', {
          refresh: refreshToken,
        });

        const newAccessToken = refreshRes.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 실패했던 요청에 새 accessToken 넣고 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        //localStorage.clear();
        // window.location.href = '/log-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('accessToken 포함 요청:', config.url);
    } else {
      console.warn('accessToken 없음 - 요청 URL:', config.url);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
