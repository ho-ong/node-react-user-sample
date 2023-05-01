import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinUser } from "../../../_actions/user_action";

function JoinPage() {
  // navigate : 페이지 이동
  let navigate = useNavigate();

  // redux dispatch
  const dispatch = useDispatch();

  // state 초기화
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // onChange handler
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  // onSubmit handler
  const onSubmitHandler = (e) => {
    // HTML 태그의 기본 이벤트 발생을 막는 메서드
    e.preventDefault();

    // password 확인
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      email: email,
      name: name,
      password: password,
    };

    // dispatch
    dispatch(joinUser(body)).then((res) => {
      // 회원가입 성공
      if (res.payload.success) {
        navigate("/login"); // "/login" 페이지로 이동
      } else {
        alert("회원가입에 실패했습니다."); // error
      }
    });
  };

  return (
    <div className="container--center">
      <form className="form--center" onSubmit={onSubmitHandler}>
        <h2>Join</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailHandler}
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={onNameHandler}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordHandler}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}

export default JoinPage;
