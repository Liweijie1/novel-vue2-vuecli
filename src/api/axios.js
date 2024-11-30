import axios from "axios";
import { Toast, Notify } from "vant";

const instanse = axios.create({
    baseURL: "https://apis.netstart.cn/yunyuedu/",
});

// 添加请求拦截器
instanse.interceptors.request.use(
    function (config) {
        Toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            duration: 0,
        });

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instanse.interceptors.response.use(
    function (response) {
        Toast.clear();
        return response;
    },
    function (error) {
        Toast.clear();
        Notify({ type: "danger", message: "网络出问题了,请刷新" });

        return Promise.reject(error);
    }
);

export default instanse;
