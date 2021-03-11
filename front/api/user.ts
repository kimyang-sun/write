import axios from 'axios';
import {
  LoginRequestPayload,
  SignUpRequestPayload,
  FollowRequestPayload,
} from 'store/modules/user';

// API 요청
export function loginAPI(data: LoginRequestPayload) {
  return axios.post('/user/login', data);
}

export function logoutAPI() {
  return axios.post('/user/logout');
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
