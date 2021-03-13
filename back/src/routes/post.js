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
