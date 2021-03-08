import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { call, delay, put, takeLatest, takeLeading } from 'redux-saga/effects';
import {
  Post,
  PostComment,
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} from 'store/modules/post';
import { addUserPost, removeUserPost } from 'store/modules/user';

// API 요청
function loadPostsAPI(data: Post[]) {
  return data;
}

function addPostAPI(data: Post) {
  // return axios.post('/api/post', data);
  return data;
}

function removePostAPI(data: { postId: number }) {
  // return axios.post('/api/post', data);
  return data;
}

function addCommentAPI(data: PostComment) {
  // return axios.post('/api/post/${data.commentId}/comment', data);
  return data;
}

// Saga 실행함수
function* loadPosts(action: PayloadAction<Post[]>) {
  try {
    yield delay(1000);
    const result = yield call(loadPostsAPI, action.payload);
    yield put(loadPostsSuccess(result));
  } catch (e) {
    yield put(loadPostsFailure(e.response.data));
  }
}

function* addPost(action: PayloadAction<Post>) {
  try {
    yield delay(1000);
    const result = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result));
    yield put(addUserPost({ postId: result.id }));
  } catch (e) {
    yield put(addPostFailure(e.response.data));
  }
}

function* removePost(action: PayloadAction<{ postId: number }>) {
  try {
    yield delay(1000);
    const result = yield call(removePostAPI, action.payload);
    yield put(removePostSuccess(result));
    yield put(removeUserPost(result));
  } catch (e) {
    yield put(removePostFailure(e.response.data));
  }
}

function* addComment(action: PayloadAction<PostComment>) {
  try {
    yield delay(1000);
    const result = yield call(addCommentAPI, action.payload);
    yield put(addCommentSuccess(result));
  } catch (e) {
    yield put(addCommentFailure(e.response.data));
  }
}

// Saga를 작동시키는 Watch 함수
export function* watchLoadPosts() {
  yield takeLeading(loadPostsRequest.type, loadPosts);
}

export function* watchAddPost() {
  yield takeLatest(addPostRequest.type, addPost);
}

export function* watchRemovePost() {
  yield takeLatest(removePostRequest.type, removePost);
}

export function* watchAddComment() {
  yield takeLatest(addCommentRequest.type, addComment);
}
