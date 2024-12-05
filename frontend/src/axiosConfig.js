import axios from "axios";
//để không phải khai báo 'http://localhost:5000' trong mỗi URL API
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/'