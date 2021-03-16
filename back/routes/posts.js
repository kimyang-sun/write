const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // where: { id: lastId }, // offset으로 하면 중간에 삭제하거나 추가하면 바뀔 수 있음
      Limit: 5,
      order: [
        ['createdAt', 'DESC'], // 최신글이 맨 위로
        // 만약 댓글도 최신댓글이 맨 위로 나오게 하려면 이 코드를 넣어주면 됨
        // [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname', 'avatar'],
        },
        {
          model: Image, // 게시글 이미지
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
        {
          model: Post,
          as: 'Scrap',
          include: [
            { model: User, attrubutes: ['id', 'nickname', 'avatar'] },
            { model: Image },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
