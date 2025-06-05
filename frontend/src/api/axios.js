import axios from "axios";


const axiosInstance = axios.create({
    baseURL:"https://bookshelf-5p0s.onrender.com/api",
    withCredentials: true,
})

export default axiosInstance;