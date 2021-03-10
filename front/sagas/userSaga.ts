import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  LoginRequestPayload,
  loginRequest,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  SignUpRequestPayload,
  FollowRequestPayload,
  followRequest,
  followSuccess,
  followFailure,
  unFollowRequest,
  unFollowSuccess,
  unFollowFailure,
} from 'store/modules/user';
import {
  followAPI,
  loginAPI,
  logoutAPI,
  signUpAPI,
  unFollowAPI,
} from 'api/user';

// Saga 실행 함수
// 여기서는 밑에 loginRequest의 액션이 인자로 들어옵니다.
function* login(action: PayloadAction<LoginRequestPayload>) {
  try {
    // fork는 비동기 call은 동기
    // fork를 쓰면 불러온것들을 result에 넣어줘야 하는데 바로 다음코드가 실행됨
    const result = yield call(loginAPI, action.payload);
    //요청 성공시
    yield put(loginSuccess(result));
  } catch (e) {
    // 요청 실패시
    yield put(loginFailure(e.response.data));
  }
}

function* logout() {
  try {
    yield delay(1000);
    // const result = yield call(logoutAPI);
    yield put(logoutSuccess());
  } catch (e) {
    yield put(logoutFailure(e.response.data));
  }
}

function* signUp(action: PayloadAction<SignUpRequestPayload>) {
  try {
    const result = yield call(signUpAPI, action.payload);
    yield put(signUpSuccess());
  } catch (e) {
    yield put(signUpFailure(e.response.data));
  }
}

function* follow(action: PayloadAction<FollowRequestPayload>) {
  try {
    yield delay(1000);
    const result = yield call(followAPI, action.payload);
    yield put(followSuccess(result));
  } catch (e) {
    yield put(followFailure(e.response.data));
  }
}

function* unFollow(action: PayloadAction<FollowRequestPayload>) {
  try {
    yield delay(1000);
    const result = yield call(unFollowAPI, action.payload);
    yield put(unFollowSuccess(result));
  } catch (e) {
    yield put(unFollowFailure(e.response.data));
  }
}

// Watch 함수
export function* watchLogin() {
  yield takeLatest(loginRequest.type, login);
  // loginRequest에서의 type이 실행되면 login함수가 실행되는데
  // loginRequest의 action이 있으면 그 액션이 login함수의 인자로 들어갑니다.
}

export function* watchLogout() {
  yield takeLatest(logoutRequest.type, logout);
}

export function* watchSignUp() {
  yield takeLatest(signUpRequest.type, signUp);
}

export function* watchFollow() {
  yield takeLatest(followRequest.type, follow);
}

export function* watchUnFollow() {
  yield takeLatest(unFollowRequest.type, unFollow);
}

/*
take = 이벤트 리스너같은 역할, 치명적인 단점, 일회용
한번 실행시키면 한번밖에 받지않아서 그 다음에 다시 실행시키면 이벤트가 사라져서 안됩니다.
해결하기 위해서는 while (true) {yield take()} 로 감싸주면 되는데 직관적이지 않아서 보통 takeEvery를 씁니다.
takeEvery와의 차이점은 while take는 동기적으로 동작하고 takeEvery는 비동기로 동작합니다.

takeEvery = 들어오는 이벤트를 실행시킵니다. 여기서도 단점이 있는데 가끔 한번에 두번이 클릭되면
그 두번을 모두 실행시켜버립니다.

takeLastest = 마지막으로 들어온 이벤트를 실행시킵니다. 이미 완료된 거 제외하고
한번에 여러개가 들어오거나 하면 완료되지 않은 이전의 것들을 없애고 마지막을 실행시킵니다.

takeleading = 처음으로 들어온 이벤트를 실행시킵니다.
한번에 여러개가 들어왔을때 처음것이 아직 완료되기 전이면 이후의 것들은 없앱니다.

그러나 takeLastest, takeLeading은 프론트서버에서만 그렇게 적용되고 백엔드서버에서는
여러번의 요청에 대해 모두 실행되어 여러번 저장됩니다.
그래서 백엔드에서도 검사를 해주어야 합니다.
하지만 보통은 이걸 사용하고 서버쪽에서 검증를 하는 방법을 많이 씁니다.

throttle = 마지막 인자로 시간을 넣어주면 그 시간동안에는 
여러번의 요청이 들어와도 무조건 한번만 실행됩니다. 이건 백엔드서버에서도 한번만 요청됩니다.

debouncing = 연이어 호출되는 함수들 중 특정 시간동안 마지막 함수(또는 제일 처음)만 호출되도록 합니다.
*/
