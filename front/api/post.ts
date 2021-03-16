import axios from 'axios';
import { AddPostType, CommentActionType } from 'store/modules/post';

// API 요청
export function loadPostsAPI(data: number) {
  // GET은 이런식으로 데이터캐싱 가능 (백엔드에서 쿼리로 사용가능)
  console.log(data);
  return axios.get(`/posts?lastId=${data || 0}`); // data가 없으면 0을 넣어줌.
}

export function addPostAPI(data: AddPostType) {
  return axios.post('/post', data);
}

export function uploadPostImageAPI(data: FormData) {
  return axios.post('/post/images', data);
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

export function scrapPostAPI(data: number) {
  return axios.post(`/post/${data}/scrap`);
}
