const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const db = require('../models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const passportConfig = require('../passport');

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('데이터베이스 연결 성공 😶');
  })
  .catch(console.error);
passportConfig();

// 이 코드는 위에쪽에 있어야함.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use(
  cors({
    origin: 'http://localhost:3005',
    credentials: true,
  })
);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(3006, () => {
  console.log('서버 실행중 😶');
});

/*  보통은 이렇게 사용합니다.
app.get = 가져오기
app.post = 생성,등록하기
app.put = 전체 수정하기
app.patch = 부분 수정하기
app.delete = 제거하기
app.options = 서버에게 요청을 알리기
app.head = Header만 가져오기
*/
