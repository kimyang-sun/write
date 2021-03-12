const express = require('express');
const { Post, Comment, Image, User } = require('../../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시글 작성 - Post /post
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      tag: req.body.tag,
      UserId: req.user.id,
    });
    // 기본정보에는 content, UserId 밖에 없어서 더 추가해줍니다.
    const fullPost = await Post.findOne({
      where: { id: post.id }, // 작성하는 해당 post를 찾아서
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Image, // 해당 글의 이미지도 넣어주고
        },
        {
          model: Comment, // 댓글
        },
        {
          model: User, // 작성자도 가져옵니다.
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 작성 - Post /post/:postId/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      tag: req.body.tag,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/', (req, res) => {
  res.json([{ id: 1, content: 'hello' }]);
});

module.exports = router;
