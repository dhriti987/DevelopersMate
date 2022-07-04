import axios from "axios";

const axiosInstance = axios.create(
    
    {
    baseURL:`${process.env.REACT_APP_SERVER_URL}/`,
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  
export default axiosInstance;