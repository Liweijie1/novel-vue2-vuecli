import axios from "./axios.js";
// 男频
const getBookCity = () => axios.get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=7");
// 女频
const getBookCityFemale = () => axios.get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=8");
// 章节列表
const getBookInfo = (source_uuid) => axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${source_uuid}`);
// 书籍详情
const getBookDetail = (source_uuid) => axios.get(`https://apis.netstart.cn/yunyuedu/book/getsub.json?id=${source_uuid}`);
// 章节内容
const getChapterContent = (source_uuid,content_uuid) => axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${source_uuid}&content_uuid=${content_uuid}`);

export { getBookCity, getBookInfo, getBookCityFemale, getBookDetail, getChapterContent };
