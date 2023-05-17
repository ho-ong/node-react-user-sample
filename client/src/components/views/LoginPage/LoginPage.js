import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";

function LoginPage() {
  // navigate : 페이지 이동
  let navigate = useNavigate();

  // redux dispatch
  const dispatch = useDispatch();

  // state 초기화
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onChange handler
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  // onSubmit handler
  const onSubmitHandler = (e) => {
    // HTML 태그의 기본 이벤트 발생을 막는 메서드
    e.preventDefault();

    let body = {
      email: email,
      password: password,
    };

    // dispatch
    dispatch(loginUser(body)).then((res) => {
      // 로그인 성공
      if (res.payload.loginSuccess) {
        navigate("/"); // "/" 페이지로 이동
      } else {
        alert("로그인에 실패했습니다."); // error
      }
    });
  };

  return (
    <div className="container-center">
      <form className="form-small" onSubmit={onSubmitHandler}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailHandler}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordHandler}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
