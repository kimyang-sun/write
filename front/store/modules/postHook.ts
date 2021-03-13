import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  loadPostsRequest,
  addCommentRequest,
  addPostRequest,
  CommentActionType,
  removePostRequest,
  likePostRequest,
  unLikePostRequest,
} from './post';

export default function usePost() {
  const {
    mainPosts,
    imagePaths,
    loadPostsLoading,
    hasMorePosts,
    addPostLoading,
    addPostDone,
    removePostLoading,
    addCommentDone,
  } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const loadPosts = useCallback(() => {
    dispatch(loadPostsRequest());
  }, []);

  const addPost = useCallback(post => {
    dispatch(addPostRequest(post));
  }, []);

  const removePost = useCallback((id: { postId: number }) => {
    dispatch(removePostRequest(id));
  }, []);

  const addComment = useCallback((comment: CommentActionType) => {
    dispatch(addCommentRequest(comment));
  }, []);

  const likePost = useCallback((id: number) => {
    dispatch(likePostRequest(id));
  }, []);

  const unLikePost = useCallback((id: number) => {
    dispatch(unLikePostRequest(id));
  }, []);

  return {
    mainPosts,
    imagePaths,
    loadPosts,
    loadPostsLoading,
    hasMorePosts,
    addPost,
    addPostLoading,
    addPostDone,
    removePost,
    removePostLoading,
    addComment,
    addCommentDone,
    likePost,
    unLikePost,
  };
}
