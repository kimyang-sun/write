import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CommentActionType,
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  loadPostRequest,
  loadPostSuccess,
  loadPostFailure,
  loadUserPostsRequest,
  loadUserPostsSuccess,
  loadUserPostsFailure,
  loadHashtagPostsRequest,
  loadHashtagPostsSuccess,
  loadHashtagPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostComplete,
  addPostFailure,
  uploadPostImageRequest,
  uploadPostImageSuccess,
  uploadPostImageFailure,
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
  scrapPostRequest,
  scrapPostSuccess,
  scrapPostFailure,
  AddPostType,
} from 'store/modules/post';
import { addUserPost, removeUserPost } from 'store/modules/user';
import {
  loadPostsAPI,
  loadUserPostsAPI,
  loadHashtagPostsAPI,
  loadPostAPI,
  addPostAPI,
  removePostAPI,
  addCommentAPI,
  likePostAPI,
  unLikePostAPI,
  uploadPostImageAPI,
  scrapPostAPI,
} from 'api/post';

// Saga 실행함수
function* loadPosts(action: PayloadAction<number>) {
  try {
    const result = yield call(loadPostsAPI, action.payload);
    yield put(loadPostsSuccess(result.data));
  } catch (e) {
    yield put(loadPostsFailure(e.response.data));
  }
}

function* loadUserPosts(action: PayloadAction<any>) {
  try {
    const result = yield call(
      loadUserPostsAPI,
      action.payload.data,
      action.payload.lastId
    );

    yield put(loadUserPostsSuccess(result.data));
  } catch (e) {
    yield put(loadUserPostsFailure(e.response.data));
  }
}

function* loadHashtagPosts(action: PayloadAction<any>) {
  try {
    const result = yield call(
      loadHashtagPostsAPI,
      action.payload.data,
      action.payload.lastId
    );
    yield put(loadHashtagPostsSuccess(result.data));
  } catch (e) {
    yield put(loadHashtagPostsFailure(e.response.data));
  }
}

function* loadPost(action: PayloadAction<number>) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put(loadPostSuccess(result.data));
  } catch (e) {
    yield put(loadPostFailure(e.response.data));
  }
}

function* addPost(action: PayloadAction<AddPostType>) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result.data));
    yield put(addUserPost({ id: result.data.id }));
    yield put(addPostComplete());
  } catch (e) {
    yield put(addPostFailure(e.response.data));
  }
}

function* uploadPostImage(action: PayloadAction<FormData>) {
  try {
    const result = yield call(uploadPostImageAPI, action.payload);
    yield put(uploadPostImageSuccess(result.data));
  } catch (e) {
    yield put(uploadPostImageFailure(e.response.data));
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

function* scrapPost(action: PayloadAction<number>) {
  try {
    const result = yield call(scrapPostAPI, action.payload);
    yield put(scrapPostSuccess(result.data));
    yield alert('스크랩 되었습니다.');
  } catch (e) {
    yield put(scrapPostFailure(e.response.data));
  }
}

// Saga를 작동시키는 Watch 함수
export function* watchLoadPosts() {
  yield takeLatest(loadPostsRequest.type, loadPosts);
}

export function* watchLoadUserPosts() {
  yield takeLatest(loadUserPostsRequest.type, loadUserPosts);
}

export function* watchLoadHashtagPosts() {
  yield takeLatest(loadHashtagPostsRequest.type, loadHashtagPosts);
}

export function* watchLoadPost() {
  yield takeLatest(loadPostRequest.type, loadPost);
}

export function* watchAddPost() {
  yield takeLatest(addPostRequest.type, addPost);
}

export function* watchUploadPostImage() {
  yield takeLatest(uploadPostImageRequest.type, uploadPostImage);
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

export function* watchScrapPost() {
  yield takeLatest(scrapPostRequest.type, scrapPost);
}
