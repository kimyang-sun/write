import axios from 'axios';
import { CommentActionType, Post } from 'store/modules/post';

// API 요청
export function loadPostsAPI() {
  return axios.get('/posts');
}

export function addPostAPI(data: Post) {
  return axios.post('/post', data);
}

export function removePostAPI(data: number) {
  // 여기서 data는 숫자이다. data를 백엔드로 보내려면 객체여야 하는데,
  // 이렇게 params로 넘겨주는 경우에는 따로 데이터를 객체로 넣어줄 필요가 없다.
  // 백엔드에서 params.postId 이런식으로 가져오면 된다.
  return axios.delete(`/post/${data}`);
}

export function addCommentAPI(data: CommentActionType) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

export function likePostAPI(data: number) {
  return axios.patch(`/post/${data}/like`);
}

export function unLikePostAPI(data: number) {
  return axios.delete(`/post/${data}/like`);
}
