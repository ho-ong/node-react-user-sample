// express : Node.js를 위한 빠르고, 개방적인 간결한 웹 프레임워크
const express = require("express");
const app = express(); // new express app
const port = 5000; // backend server port

// bodyParser : API 요청에서 받은 body 값을 파싱하는 역할
// body-parser 미사용 시 Undefined Error 발생
const bodyParser = require("body-parser");
// bodyParser를 통해 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

// cookieParser : 요청된 cookie를 쉽게 추출할 수 있도록 도와주는 미들웨어
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// models의 User.js 가져오기
const { User } = require("./models/User");

// middleware의 auth.js 가져오기
const { auth } = require("./middleware/auth");

// mongoose : Node.js와 MongoDB를 연결하는 ODM
// ODM(Object Document Mapping) : 객체와 문서를 1대 1로 매칭하는 역할
const mongoose = require("mongoose");

// config : MongoDB 환경 변수 Key 설정
// config.mongoURI
const config = require("./config/key");

// mongoose connect
mongoose
  .connect(config.mongoURI, {
    // error 방지
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected")) // connect
  .catch((err) => console.log(err)); // error

// root
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// HOC(Auth)
// Auth : 사용자에 따라 페이지 접근 권한을 다르게 부여
app.get("/api/user/auth", auth, (req, res) => {
  // Authentication = True
  // 어떤 페이지에서든 user 정보 사용 가능
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

// 회원가입
app.post("/api/user/join", (req, res) => {
  // 필요한 정보들을 클라이언트에서 가져오기 -> DB에 정보들을 넣기
  const user = new User(req.body);
  // user 정보 저장
  user.save((err, user) => {
    if (err) return res.json({ success: false, err }); // error
    return res.status(200).json({
      success: true, // success
    });
  });
});

// 로그인
app.post("/api/user/login", (req, res) => {
  // email을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      // user가 없을 경우
      return res.json({
        loginSuccess: false,
        message: "사용자가 없습니다.",
      });

    // email이 DB에 있을 경우 password가 일치하는지 확인하기
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        // password가 일치하지 않을 경우
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      // password가 일치하면 token을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); // error

        // token을 저장 (쿠키, 세션, 로컬 스토리지 등)
        // cookie에 token을 저장
        res.cookie("auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// 로그아웃
app.get("/api/user/logout", auth, (req, res) => {
  // token을 삭제
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err }); // error
    return res.status(200).send({
      success: true, // success
    });
  });
});

// port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// axios test
app.get("/api/hello", (req, res) => {
  res.send("Hello!");
});
