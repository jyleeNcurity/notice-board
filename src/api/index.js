import axios from "axios";

const config = {
  baseURL: "http://192.168.70.212/",
};

// 2. API 함수들을 정리
function fetchboard() {
  //게시판 목록 요청
  return axios.get(`${config.baseURL}posts`);
}

export { fetchboard };
