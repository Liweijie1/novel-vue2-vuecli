import axios from "./axios.js";

const getBookCity = () => axios.get("https://apis.netstart.cn/yunyuedu/source/v2/cat.json?catId=7");

export { getBookCity };
