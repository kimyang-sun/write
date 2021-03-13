const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../../models');
const db = require('../../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

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

// 새로고침 후 로그인 정보 다시 불러오기
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] }, // 비밀번호 제외
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 로그인 - POST /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
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

      // 비밀번호는 굳이 프론트로 보내줄 필요가 없어서 제외해주고 Post 정보도 같이 넣어줌
      const userWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] }, // 비밀번호 제외
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
        ],
      });

      return res.status(200).json(userWithoutPassword); // 완료되면 유저정보를 프론트로 보내줌
    });
  })(req, res, next);
});

// 로그아웃 - POST /user/logout
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// 프로필 수정
router.patch('/profile', isLoggedIn, async (req, res, next) => {
  try {
    User.update(
      {
        nickname: req.body.nickname,
        introduction: req.body.introduction,
        avatar: req.body.avatar,
      },
      { where: { id: req.user.id } } // 조건 : 내 아이디의 프로필을 수정해야함
    );
    res.status(200).json({
      nickname: req.body.nickname,
      introduction: req.body.introduction,
      avatar: req.body.avatar,
    });
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
