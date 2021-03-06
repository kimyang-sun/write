import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  addCommentRequest,
  addPostRequest,
  Post,
  CommentActionType,
  removePostRequest,
} from './post';

export default function usePost() {
  const {
    mainPosts,
    imagePaths,
    addPostLoading,
    addPostDone,
    removePostLoading,
    removePostDone,
    addCommentDone,
  } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const addPost = useCallback((post: Post) => {
    dispatch(addPostRequest(post));
  }, []);

  const removePost = useCallback((id: { postId: number }) => {
    dispatch(removePostRequest(id));
  }, []);

  const addComment = useCallback((comment: CommentActionType) => {
    dispatch(addCommentRequest(comment));
  }, []);

  return {
    mainPosts,
    imagePaths,
    addPost,
    addPostLoading,
    addPostDone,
    removePost,
    removePostLoading,
    removePostDone,
    addComment,
    addCommentDone,
  };
}
