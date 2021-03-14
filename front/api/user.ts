import axios from 'axios';
import {
  LoginRequestPayload,
  SignUpRequestPayload,
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

export function followAPI(data: number) {
  return axios.patch(`/user/${data}/follow`);
}

export function unFollowAPI(data: number) {
  return axios.delete(`/user/${data}/follow`);
}

export function removeFollowerAPI(data: number) {
  return axios.delete(`/user/follower/${data}`);
}

export function loadFollowersAPI() {
  return axios.get('/user/followers');
}

export function loadFollowingsAPI() {
  return axios.get('/user/followings');
}
