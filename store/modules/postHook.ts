import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  addCommentRequest,
  addPostRequest,
  Post,
  CommentActionType,
} from './post';

export default function usePost() {
  const { mainPosts, imagePaths, addPostDone, addCommentDone } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch();
  const addPost = useCallback((post: Post) => {
    dispatch(addPostRequest(post));
  }, []);
  const addComment = useCallback((comment: CommentActionType) => {
    dispatch(addCommentRequest(comment));
  }, []);

  return {
    mainPosts,
    imagePaths,
    addPost,
    addPostDone,
    addComment,
    addCommentDone,
  };
}
