import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  Post,
  PostComment,
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} from 'store/modules/post';

// API 요청
function addPostAPI(data: Post) {
  // return axios.post('/api/post', data);
  return data;
}

function addCommentAPI(data: PostComment) {
  // return axios.post('/api/post/${data.commentId}/comment', data);
  return data;
}

// Saga 실행함수
function* addPost(action: PayloadAction<Post>) {
  try {
    yield delay(1000);
    const result = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result));
  } catch (e) {
    yield put(addPostFailure(e.response.data));
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

// Watch 함수
export function* watchAddPost() {
  yield takeLatest(addPostRequest.type, addPost);
}

export function* watchAddComment() {
  yield takeLatest(addCommentRequest.type, addComment);
}
