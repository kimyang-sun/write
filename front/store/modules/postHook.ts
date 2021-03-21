import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  loadPostsRequest,
  loadUserPostsRequest,
  loadRelatedPostsRequest,
  loadLikedPostsRequest,
  addCommentRequest,
  addPostRequest,
  CommentActionType,
  removePostRequest,
  updatePostRequest,
  likePostRequest,
  unLikePostRequest,
  uploadPostImageRequest,
  removeUploadedPostImage,
  AddPostType,
  scrapPostRequest,
  loadHashtagPostsRequest,
} from './post';

export default function usePost() {
  const {
    mainPosts,
    singlePost,
    imagePaths,
    loadPostsLoading,
    hasMorePosts,
    addPostLoading,
    addPostDone,
    removePostLoading,
    updatePostLoading,
    updatePostDone,
    addCommentDone,
    uploadPostImageLoading,
  } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const loadPosts = useCallback((id?: number) => {
    dispatch(loadPostsRequest(id));
  }, []);

  const loadUserPosts = useCallback((data: any) => {
    dispatch(loadUserPostsRequest({ data: data.data, lastId: data.lastId }));
  }, []);

  const loadRelatedPosts = useCallback((id?: number) => {
    dispatch(loadRelatedPostsRequest(id));
  }, []);

  const loadLikedPosts = useCallback((id?: number) => {
    dispatch(loadLikedPostsRequest(id));
  }, []);

  const loadHashtagPosts = useCallback((data: any) => {
    dispatch(loadHashtagPostsRequest({ data: data.data, lastId: data.lastId }));
  }, []);

  const addPost = useCallback((post: AddPostType) => {
    dispatch(addPostRequest(post));
  }, []);

  const uploadPostImage = useCallback((data: any) => {
    dispatch(uploadPostImageRequest(data));
  }, []);

  const removePostImage = useCallback((index: number) => {
    dispatch(removeUploadedPostImage(index));
  }, []);

  const removePost = useCallback((id: number) => {
    dispatch(removePostRequest(id));
  }, []);

  const updatePost = useCallback((data: any) => {
    dispatch(updatePostRequest({ postId: data.postId, content: data.content }));
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

  const scrapPost = useCallback((id: number) => {
    dispatch(scrapPostRequest(id));
  }, []);

  return {
    mainPosts,
    singlePost,
    imagePaths,
    loadPosts,
    loadPostsLoading,
    loadUserPosts,
    loadHashtagPosts,
    loadRelatedPosts,
    loadLikedPosts,
    hasMorePosts,
    addPost,
    addPostLoading,
    addPostDone,
    uploadPostImage,
    removePostImage,
    removePost,
    removePostLoading,
    updatePost,
    updatePostLoading,
    updatePostDone,
    addComment,
    addCommentDone,
    likePost,
    unLikePost,
    scrapPost,
    uploadPostImageLoading,
  };
}
