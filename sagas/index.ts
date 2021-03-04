import { all, fork } from 'redux-saga/effects';
import { watchAddPost } from './postSaga';
import { watchLogin, watchLogout } from './userSaga';

// rootSaga를 만들어줘서 store에 추가해주어야 합니다.
export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
