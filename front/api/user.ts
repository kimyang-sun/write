import axios from 'axios';
import {
  LoginRequestPayload,
  SignUpRequestPayload,
  FollowRequestPayload,
  ProfilePayload,
} from 'store/modules/user';

// API 요청
export function loadMyInfoAPI() {
  return axios.get('/user');
}

export function loginAPI(data: LoginRequestPayload) {
  return axios.post('/user/login', data);
}

export function logoutAPI() {
  return axios.post('/user/logout');
}

export function changeProfileAPI(data: ProfilePayload) {
  return axios.patch('/user/profile', data);
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
