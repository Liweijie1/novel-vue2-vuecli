import axios from "./axios.js";

const getBookCity = () => axios.get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=7");
const getBookInfo = (source_uuid) => axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${source_uuid}`);
// const getBookInfo = () => axios.get("https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=9cc63831542a4bd5aca2c6e4ca7bd05b_4");
// const getBookInfo = (source_uuid) =>
//     axios.get("https://apis.netstart.cn/yunyuedu/reader/book/info.json", {
//         query: {
//           source_uuid,
//         },
//     });

export { getBookCity,getBookInfo};
