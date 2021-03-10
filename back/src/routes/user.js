const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../../models');

const router = express.Router();

// 로그인 - POST /user/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// 회원가입 - POST /user/
router.post('/', async (req, res, next) => {
  try {
    // 이미 존재하는 이메일인지 체크
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      res.status(403).send('이미 가입된 이메일입니다.');
      return;
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 테이블 안에 데이터를 넣습니다.
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    }); // await을 붙혀서 이게 실행된 후에 밑에 코드가 실행됩니다.
    res.status(201).send('ok');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

/* 
error number 백번대
200 - 성공
300 - 리다이렉트 or 캐싱
400 - 클라이언트 에러
500 - 서버 에러
*/
