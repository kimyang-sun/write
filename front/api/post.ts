import axios from 'axios';
import { CommentActionType, Post } from 'store/modules/post';

// API 요청
export function loadPostsAPI(data: Post[]) {
  return data;
}

export function addPostAPI(data: Post) {
  return axios.post('/post', data);
}

export function removePostAPI(data: { postId: number }) {
  // return axios.post('/api/post', data);
  return data;
}

export function addCommentAPI(data: CommentActionType) {
  return axios.post(`/post/${data.postId}/comment`, data);
}
