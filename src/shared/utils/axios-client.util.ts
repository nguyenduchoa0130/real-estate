import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_WEB_SERVICE_URL,
});

export default axiosClient;
