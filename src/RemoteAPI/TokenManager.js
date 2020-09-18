import axios from 'axios';

export default function TokenManager(mainAxiosInstance) {
  let _token;
  let _tokenExpiresAt;

  const _axios = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  }); 

  function set(token) {
    // save token in memory and set token to axios instance which is used across the app  
    _token = token;
    _tokenExpiresAt = JSON.parse(atob(token.split('.')[1])).exp;
    mainAxiosInstance.defaults.headers.common['Authorization'] = token;
  }

  async function autoRefresh(config) {
    if (!_token) return config;

    if (!_tokenExpiresAt) {
      _tokenExpiresAt = JSON.parse(atob(_token.split('.')[1])).exp;
    }

    const expiresInLessThanFiveMinutes = (_tokenExpiresAt - Date.now() / 1000) < 5 * 60;
    if (expiresInLessThanFiveMinutes) {
      /* use another axios instance to refresh token in background (avoid triggering cyclical 
      token refresh from axios instance request interceptor) */
      _axios.post('/api/refresh', null, { headers : { 'Authorization': _token }})
        .then(res => {
          set(res.data.token);
        }).catch(error => {
          console.log('refresh error', error)
        })
    }
    
    return config;
  }

  return {
    autoRefresh,
    set,
  };
}
