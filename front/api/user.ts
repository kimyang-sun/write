import axios from 'axios';
import {
  LoginRequestPayload,
  UserDataPayload,
  SignUpRequestPayload,
  FollowRequestPayload,
} from 'store/modules/user';

// API 요청
export function loginAPI(data: LoginRequestPayload) {
  return axios.post('/user/login', data);
  // const userData: UserDataPayload = {
  //   id: shortId.generate(),
  //   email: data.email,
  //   nickname: '선양',
  //   introduction: '배움을 즐기는 개발자입니다.',
  //   Posts: [],
  //   Followers: [
  //     { id: shortId.generate(), nickname: '류태연' },
  //     { id: shortId.generate(), nickname: '민병관' },
  //     { id: shortId.generate(), nickname: '박희진' },
  //     { id: shortId.generate(), nickname: '임서윤 & 임이슬' },
  //   ],
  //   Followings: [
  //     { id: shortId.generate(), nickname: '류태연' },
  //     { id: shortId.generate(), nickname: '민병관' },
  //     { id: shortId.generate(), nickname: '박희진' },
  //     { id: shortId.generate(), nickname: '임서윤 & 임이슬' },
  //   ],
  // };
  // return userData;
}

export function logoutAPI(data: LoginRequestPayload) {
  // return axios.post('api/login', data);
  return data;
}

export function signUpAPI(data: SignUpRequestPayload) {
  return axios.post('/user', data);
}

export function followAPI(data: FollowRequestPayload) {
  return data;
}

export function unFollowAPI(data: FollowRequestPayload) {
  return data;
}
