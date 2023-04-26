import axios from "axios";
import { AUTH_USER, JOIN_USER, LOGIN_USER } from "./types";

// 로그인
export function loginUser(dataToSubmit) {
  const req = axios
    .post("/api/user/login", dataToSubmit)
    .then((res) => res.data);

  // login user 정보를 user reducer로 보내기
  return {
    type: LOGIN_USER,
    payload: req,
  };
}

// 회원가입
export function joinUser(dataToSubmit) {
  const req = axios
    .post("/api/user/join", dataToSubmit)
    .then((res) => res.data);

  // join user 정보를 user reducer로 보내기
  return {
    type: JOIN_USER,
    payload: req,
  };
}

// HOC(Auth)
export function auth() {
  const req = axios.get("/api/user/auth").then((res) => res.data);

  // auth user 정보를 user reducer로 보내기
  return {
    type: AUTH_USER,
    payload: req,
  };
}
