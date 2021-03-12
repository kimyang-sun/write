import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest, takeLeading } from 'redux-saga/effects';
import {
  Post,
  PostComment,
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
  CommentActionType,
} from 'store/modules/post';
import { addUserPost, removeUserPost } from 'store/modules/user';
import {
  loadPostsAPI,
  addPostAPI,
  removePostAPI,
  addCommentAPI,
} from 'api/post';

// Saga 실행함수
function* loadPosts(action: PayloadAction<Post[]>) {
  try {
    const result = yield call(loadPostsAPI, action.payload);
    yield put(loadPostsSuccess(result));
  } catch (e) {
    yield put(loadPostsFailure(e.response.data));
  }
}

function* addPost(action: PayloadAction<Post>) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result.data));
    yield put(addUserPost({ postId: result.data.id }));
    yield put(addPostComplete());
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

function* addComment(action: PayloadAction<CommentActionType>) {
  try {
    yield delay(1000);
    const result = yield call(addCommentAPI, action.payload);
    yield put(addCommentSuccess(result.data));
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
