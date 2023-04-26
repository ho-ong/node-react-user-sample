import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  // navigate : 페이지 이동
  let navigate = useNavigate();

  // axios test
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res.data));
  }, []);

  // onClick handler
  const onClickHandler = () => {
    axios.get("/api/user/logout").then((res) => {
      // 로그아웃 성공
      if (res.data.success) {
        navigate("/login"); // "/login" 페이지로 이동
      } else {
        alert("로그아웃에 실패했습니다."); // error
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>LandingPage</h1>

      {/* 로그아웃 */}
      <button
        style={{
          width: "60px",
          marginLeft: "20px",
        }}
        onClick={onClickHandler}
      >
        Logout
      </button>
    </div>
  );
}

export default LandingPage;
