import * as express from 'express';
import * as bcrypt from 'bcrypt';
const { User } = require('../../models');

const router = express.Router();

router.post(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // 이미 존재하는 이메일인지 체크
      const exUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (exUser) {
        res.status(403).send('이미 사용중인 이메일입니다.');
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
  }
);

export default router;

/* 
error number 백번대
200 - 성공
300 - 리다이렉트
400 - 클라이언트 에러
500 - 서버 에러
*/
