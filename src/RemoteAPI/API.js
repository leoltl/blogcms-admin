import axios from 'axios';
import TokenManager from './TokenManager';
import Cache from './Cache';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
}); 

const tokenManager = TokenManager(axiosInstance);

axiosInstance.interceptors.request.use(tokenManager.autoRefresh)

function makeAPI() {
  const postCache = Cache();
  
  function listPosts() {
    return axiosInstance.get('/api/posts')
      .then(res => {
        postCache.set(res.data);
        return res;
      })
  }
  
  function detailPosts(id) {
    if (postCache.has(id)) {
      return Promise.resolve({ data: postCache.get(id) });
    }
    return axiosInstance.get(`/api/posts/${id}`)
  }

  function signin(username, password) {
    return axiosInstance.post('/api/sign-in', {
       username, password
    }).then(res => {
      tokenManager.set(res.data.token)
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
