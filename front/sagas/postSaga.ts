import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import {
  Post,
  CommentActionType,
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostComplete,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  likePostRequest,
  likePostSuccess,
  likePostFailure,
  unLikePostRequest,
  unLikePostSuccess,
  unLikePostFailure,
} from 'store/modules/post';
import { addUserPost, removeUserPost } from 'store/modules/user';
import {
  loadPostsAPI,
  addPostAPI,
  removePostAPI,
  addCommentAPI,
  likePostAPI,
  unLikePostAPI,
} from 'api/post';

// Saga 실행함수
function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put(loadPostsSuccess(result.data));
  } catch (e) {
    yield put(loadPostsFailure(e.response.data));
  }
}

function* addPost(action: PayloadAction<Post>) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result.data));
    yield put(addUserPost({ id: result.data.id }));
    yield put(addPostComplete());
  } catch (e) {
    yield put(addPostFailure(e.response.data));
  }
}

function* removePost(action: PayloadAction<number>) {
  try {
    const result = yield call(removePostAPI, action.payload);
    yield put(removePostSuccess(result.data));
    yield put(removeUserPost(result.data));
  } catch (e) {
    yield put(removePostFailure(e.response.data));
  }
}

function* addComment(action: PayloadAction<CommentActionType>) {
  try {
    const result = yield call(addCommentAPI, action.payload);
    yield put(addCommentSuccess(result.data));
  } catch (e) {
    yield put(addCommentFailure(e.response.data));
  }
}

function* likePost(action: PayloadAction<number>) {
  try {
    const result = yield call(likePostAPI, action.payload);
    yield put(likePostSuccess(result.data));
  } catch (e) {
    yield put(likePostFailure(e.response.data));
  }
}

function* unLikePost(action: PayloadAction<number>) {
  try {
    const result = yield call(unLikePostAPI, action.payload);
    yield put(unLikePostSuccess(result.data));
  } catch (e) {
    yield put(unLikePostFailure(e.response.data));
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

export function* watchLikePost() {
  yield takeLatest(likePostRequest.type, likePost);
}

export function* watchUnLikePost() {
  yield takeLatest(unLikePostRequest.type, unLikePost);
}
