import axios from 'axios';
import shortId from 'shortid';
import {
  LoginRequestPayload,
  UserDataPayload,
  SignUpRequestPayload,
  FollowRequestPayload,
} from 'store/modules/user';

// API 요청
export function loginAPI(data: LoginRequestPayload) {
  // return axios.post('api/login', data);
  const userData: UserDataPayload = {
    id: shortId.generate(),
    userEmail: data.userEmail,
    nickname: '선양',
    introduction: '배움을 즐기는 개발자입니다.',
    Posts: [],
    Followers: [
      { id: shortId.generate(), nickname: '류태연' },
      { id: shortId.generate(), nickname: '민병관' },
      { id: shortId.generate(), nickname: '박희진' },
      { id: shortId.generate(), nickname: '임서윤 & 임이슬' },
    ],
    Followings: [
      { id: shortId.generate(), nickname: '류태연' },
      { id: shortId.generate(), nickname: '민병관' },
      { id: shortId.generate(), nickname: '박희진' },
      { id: shortId.generate(), nickname: '임서윤 & 임이슬' },
    ],
  };
  return userData;
}

export function logoutAPI(data: LoginRequestPayload) {
  // return axios.post('api/login', data);
  return data;
}

export function signUpAPI(data: SignUpRequestPayload) {
  return axios.post('http://localhost:3006/user');
}

export function followAPI(data: FollowRequestPayload) {
  return data;
}

export function unFollowAPI(data: FollowRequestPayload) {
  return data;
}
