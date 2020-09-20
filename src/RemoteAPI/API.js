import axios from 'axios';
import TokenManager from './TokenManager';
import Cache from './Cache';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'

const axiosInstance = axios.create({ baseURL }); 

export const tokenManager = TokenManager(axiosInstance);

axiosInstance.interceptors.request.use((config) => {
  tokenManager.autoRefresh(`${baseURL}/api/refresh`)
  return config
})

function makeAPI() {
  const postCache = Cache();
  const commentsCache = Cache();

  function listComments() {
    if (!commentsCache.needFullFetch()) {
      return Promise.resolve({ data: commentsCache.get() })
    }

    return axiosInstance.get('/api/comments')
      .then(res => {
        commentsCache.setArray(res.data, { fullFetch: true });
        return res
      });
  }

  function updateComment(id, published) {
    return axiosInstance.put(`/api/comments/${id}`, { published: Boolean(published) })
      .then((res) => {
        commentsCache.set(res.data._id, res.data);
        console.log('done')
      })
  }
  
  function listPosts() {
    if (!postCache.needFullFetch()) {
      return Promise.resolve({ data: postCache.get() })
    }

    return axiosInstance.get('/api/posts')
      .then(res => {
        postCache.setArray(res.data, { fullFetch: true });
        return res;
      });
  }
  
  function detailPosts(id) {
    if (id === undefined) {
      return Promise.resolve({ data: { title: "", body: "" }})
    }
    if (postCache.has(id)) {
      return Promise.resolve({ data: postCache.get(id) });
    }
    return axiosInstance.get(`/api/posts/${id}`)
      .then(res => {
        postCache.set(id, res.data);
        return res;
      });
  }

  function updatePost(id, post) {
    return axiosInstance.put(`/api/posts/${id}`, post)
      .then(res => {
        postCache.set(id, res.data);
        return res
      });
  }

  function createPost(post) {
    return axiosInstance.post(`/api/posts`, post)
      .then(res => {
        postCache.set(res.data._id, res.data)
        return res
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

  function signout() {
    tokenManager.clear()
  }

  return {
    listComments,
    updateComment,
    listPosts,
    detailPosts,
    updatePost,
    createPost,
    signin,
    signout,
  }
};

export default makeAPI();
