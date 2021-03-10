import axios from 'axios';
import { Post, PostComment } from 'store/modules/post';

// API 요청
export function loadPostsAPI(data: Post[]) {
  return data;
}

export function addPostAPI(data: Post) {
  // return axios.post('/api/post', data);
  return data;
}

export function removePostAPI(data: { postId: number }) {
  // return axios.post('/api/post', data);
  return data;
}

export function addCommentAPI(data: PostComment) {
  // return axios.post('/api/post/${data.commentId}/comment', data);
  return data;
}
