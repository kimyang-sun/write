import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  loadPostsRequest,
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
    loadPostsLoading,
    hasMorePosts,
    addPostLoading,
    addPostDone,
    removePostLoading,
    removePostDone,
    addCommentDone,
  } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const loadPosts = useCallback((posts: any[]) => {
    dispatch(loadPostsRequest(posts));
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
    removePostDone,
    addComment,
    addCommentDone,
  };
}
