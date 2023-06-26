import axios from 'axios';
import Cookies from 'js-cookie';

const fetchAxios = () => {
  const defaultOptions = {
    // baseURL: process.env.REACT_APP_API_PATH,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchAxios();