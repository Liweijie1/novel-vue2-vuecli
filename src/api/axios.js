import axios from "axios";

const instanse = axios.create({
    baseURL: "https://apis.netstart.cn/yunyuedu/",
});

export default instanse;
