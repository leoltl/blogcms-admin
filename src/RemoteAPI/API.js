import axios from 'axios';
import TokenManager from './TokenManager';
import Cache from './Cache';

const baseURL = process.env.BASE_URL || 'http://localhost:3000'

const axiosInstance = axios.create({ baseURL }); 

export const tokenManager = TokenManager(axiosInstance);

axiosInstance.interceptors.request.use((config) => {
  tokenManager.autoRefresh(`${baseURL}/api/refresh`)
  return config
})

function makeAPI() {
  const postCache = Cache();
  
  function listPosts() {
    if (!postCache.isEmpty()) {
      return Promise.resolve({ data: postCache.get() })
    }

    return axiosInstance.get('/api/posts')
      .then(res => {
        postCache.setArray(res.data);
        return res;
      });
  }
  
  function detailPosts(id) {
    if (postCache.has(id)) {
      return Promise.resolve({ data: postCache.get(id) });
    }
    return axiosInstance.get(`/api/posts/${id}`)
      .then(res => {
        postCache.set(id, res.data);
        return res;
      });
  }

  function signin(username, password, remember=false) {
    return axiosInstance.post('/api/sign-in', {
       username, password
    }).then(res => {
      tokenManager.set(res.data.token, Boolean(remember))
      return res
    })
  }

  return {
    listPosts,
    detailPosts,
    signin,
  }
};

export default makeAPI();
