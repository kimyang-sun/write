const express = require('express');
const multer = require('multer');
const path = require('path');
const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const fs = require('fs');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (e) {
  console.log('uploads 폴더가 없어서 생성합니다.');
  fs.mkdirSync('uploads');
}

// 게시글 작성 - Post /post
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.tag.match(/#[^\s#,]+/g); // 해시태그 추출
    const post = await Post.create({
      content: req.body.content,
      tag: req.body.tag,
      UserId: req.user.id,
    });

    // 만약 태그에 정규표현식에 해당하는 해시태그들이 있다면,
    if (hashtags) {
      // 해시태그 문장만 잘라서 Hashtag 모델을 저장합니다.
      // findOrCreate로 db에 이미 같은 해시태그가 존재하는지 확인하고 없으면 저장합니다.
      const result = await Promise.all(
        hashtags.map(tag =>
          Hashtag.findOrCreate({
            where: { content: tag.slice(1).toLowerCase() },
          })
        )
      ); // [태그1, true], [태그2, false] 이런식으로 저장됩니다.
      await post.addHashtags(result.map(tag => tag[0])); // 그래서 배열의 첫번째만 저장
    }

    // 이미지가 존재할 경우 Image 모델을 만들어줍니다.
    if (req.body.image) {
      const images = await Promise.all(
        req.body.image.map(image => Image.create({ src: image }))
      );
      await post.addImages(images);
    }

    // 기본정보에는 content, UserId 밖에 없어서 더 추가해줍니다.
    const fullPost = await Post.findOne({
      where: { id: post.id }, // 작성하는 해당 post를 찾아서
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname', 'avatar'],
        },
        {
          model: Image, // 해당 글의 이미지도 넣어주고
        },
        {
          model: Comment, // 댓글
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'nickname', 'avatar'],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 이미지 첨부 - POST /post/images
const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, done) {
      done(null, 'uploads');
    },
    filename(_req, file, done) {
      // ex) kim.png
      const ext = path.extname(file.originalname); // 확장자 추출 - png
      const basename = path.basename(file.originalname, ext); // 이름 추출 - kim
      done(null, basename + '_' + new Date().getTime() + ext); // kim 뒤에 시간초가 붙음 (중복방지)
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20mb
});
// upload. array는 여러개의 사진 single은 하나의 사진 이미지가 없으면 none()
router.post('/images', isLoggedIn, upload.single('image'), (req, res) => {
  res.json(req.file.filename);
});

// 게시글 삭제 - DELETE /post/:postId
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    // 시퀄라이즈에선 제거할때 destroy로 합니다.
    await Post.destroy({
      where: {
        id: req.params.postId, // 해당 포스트 id인 글을 찾아
        UserId: req.user.id, // 아이디도 똑같은지 한번 더 비교하고 삭제
      },
    });
    res.json({ PostId: parseInt(req.params.postId, 10) }); // 해당 포스트의 id를 다시 보내줌
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 댓글 작성 - Post /post/:postId/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    // 해당 id의 게시글이 존재하는지 확인
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 좋아요 - PATCH /post/:postId/like
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('존재하지 않는 글입니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 좋아요 취소 - DELETE /post/:postId/like
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('존재하지 않는 글입니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
