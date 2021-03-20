import axios from 'axios';
import { PostImageUploader } from 'lib/cloudinary';
import { AddPostType, CommentActionType } from 'store/modules/post';

const imageUploader = new PostImageUploader();

// API 요청
export function loadPostsAPI(lastId: number) {
  // GET은 이런식으로 데이터캐싱 가능 (백엔드에서 쿼리로 사용가능)
  return axios.get(`/posts?lastId=${lastId || 0}`); // data가 없으면 0을 넣어줌.
}

export function loadUserPostsAPI(data: any, lastId?: any) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

export function loadHashtagPostsAPI(data: any, lastId?: any) {
  // 한글이라 서버에서 오류가 남 (encodeURIComponent로 감싸줍니다.)
  return axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  );
}

export function loadPostAPI(data: any) {
  return axios.get(`/post/${data}`);
}

export function addPostAPI(data: AddPostType) {
  return axios.post('/post', data);
}

export async function uploadPostImageAPI(data: any) {
  const uploaded = await imageUploader.upload(data);
  return uploaded.secure_url;
}

export function removePostAPI(data: number) {
  // 여기서 data는 숫자이다. data를 백엔드로 보내려면 객체여야 하는데,
  // 이렇게 params로 넘겨주는 경우에는 따로 데이터를 객체로 넣어줄 필요가 없다.
  // 백엔드에서 params.postId 이런식으로 가져오면 된다.
  return axios.delete(`/post/${data}`);
}

export function updatePostAPI(data: any) {
  return axios.patch(`/post/${data.postId}`, data);
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
