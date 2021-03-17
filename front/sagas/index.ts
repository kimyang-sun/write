import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import {
  watchLoadPosts,
  watchLoadUserPosts,
  watchLoadHashtagPosts,
  watchLoadPost,
  watchAddComment,
  watchAddPost,
  watchRemovePost,
  watchLikePost,
  watchUnLikePost,
  watchUploadPostImage,
  watchScrapPost,
} from './postSaga';
import {
  watchLogin,
  watchLogout,
  watchChangeProfile,
  watchUploadUserImage,
  watchFollow,
  watchUnFollow,
  watchSignUp,
  watchLoadMyInfo,
  watchLoadUser,
  watchLoadFollowers,
  watchLoadFollowings,
  watchRemoveFollower,
} from './userSaga';

// Axios Config Defaults
axios.defaults.baseURL = 'http://localhost:3006';
axios.defaults.withCredentials = true; // 로그인을 하고도 게시글이 안써지거나 해서 쿠키를 공유해줘야 합니다.

// rootSaga를 만들어줘서 store에 추가해주어야 합니다.
export default function* rootSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchChangeProfile),
    fork(watchUploadUserImage),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchRemoveFollower),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchUploadPostImage),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchScrapPost),
  ]);
}
