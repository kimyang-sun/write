import { all, fork } from 'redux-saga/effects';
import {
  watchLoadPosts,
  watchAddComment,
  watchAddPost,
  watchRemovePost,
} from './postSaga';
import {
  watchLogin,
  watchLogout,
  watchFollow,
  watchUnFollow,
  watchSignUp,
} from './userSaga';

// rootSaga를 만들어줘서 store에 추가해주어야 합니다.
export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
