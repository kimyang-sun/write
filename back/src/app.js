const express = require('express');
const cors = require('cors');
const passportConfig = require('../passport');

const db = require('../models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공 😶');
  })
  .catch(console.error);

// 이 코드는 위에쪽에 있어야함.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.use(
  cors({
    origin: '*',
    credentials: false,
  })
);
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3006, () => {
  console.log('실행중 😶');
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
