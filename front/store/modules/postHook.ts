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
  uploadPostImageRequest,
  removeUploadedPostImage,
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

  const uploadPostImage = useCallback(data => {
    dispatch(uploadPostImageRequest(data));
  }, []);

  const removePostImage = useCallback((index: number) => {
    dispatch(removeUploadedPostImage(index));
  }, []);

  const removePost = useCallback((id: number) => {
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
    uploadPostImage,
    removePostImage,
    removePost,
    removePostLoading,
    addComment,
    addCommentDone,
    likePost,
    unLikePost,
  };
}
