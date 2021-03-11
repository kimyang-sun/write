import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type UserState = {
  loginLoading: boolean;
  loginError: string;
  logoutLoading: boolean;
  logoutError: string;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string;
  followLoading: number;
  followError: string;
  unFollowError: string;
  userData: UserDataPayload;
};

// Follow 타입
export type Follow = {
  id: number;
  nickname: string;
};

// 액션 Payload 타입
export type LoginRequestPayload = {
  email: string;
  password: string;
};

export type UserDataPayload = {
  id: number;
  email: string;
  nickname: string;
  introduction: string;
  Posts: { postId: number }[];
  Followers: Follow[];
  Followings: Follow[];
};

export type SignUpRequestPayload = {
  email: string;
  nickname: string;
  password: string;
};

export type FollowRequestPayload = {
  postId: number;
  postUserId: number;
};

// 초기 상태
const initialState: UserState = {
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  logoutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  followLoading: null,
  followError: null,
  unFollowError: null,
  userData: null,
};

// 리듀서 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login
    loginRequest(
      state: UserState,
      _action: PayloadAction<LoginRequestPayload>
    ) {
      state.loginLoading = true;
      state.loginError = null;
    },

    loginSuccess(state: UserState, action: PayloadAction<UserDataPayload>) {
      state.loginLoading = false;
      state.userData = action.payload;
    },

    loginFailure(state: UserState, action: PayloadAction<string>) {
      state.loginLoading = false;
      state.loginError = action.payload;
    },

    // Logout
    logoutRequest(state: UserState) {
      state.logoutLoading = true;
      state.logoutError = null;
    },

    logoutSuccess(state: UserState) {
      state.logoutLoading = false;
      state.userData = null;
      state.signUpDone = false;
    },

    logoutFailure(state: UserState, action: PayloadAction<string>) {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },

    // Sign up
    signUpRequest(
      state: UserState,
      _action: PayloadAction<SignUpRequestPayload>
    ) {
      state.signUpLoading = true;
      state.signUpDone = false;
      state.signUpError = null;
    },

    signUpSuccess(state: UserState) {
      state.signUpLoading = false;
      state.signUpDone = true;
    },

    signUpFailure(state: UserState, action: PayloadAction<string>) {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },

    // User Post Add & Remove
    addUserPost(state: UserState, action: PayloadAction<{ postId: number }>) {
      state.userData.Posts.unshift(action.payload);
    },

    removeUserPost(
      state: UserState,
      action: PayloadAction<{ postId: number }>
    ) {
      state.userData.Posts = state.userData.Posts.filter(
        post => post.postId !== action.payload.postId
      );
    },

    // Follow
    followRequest(
      state: UserState,
      action: PayloadAction<{ postId: number; postUserId: number }>
    ) {
      state.followLoading = action.payload.postId;
      state.followError = null;
    },

    followSuccess(
      state: UserState,
      action: PayloadAction<{ postId: number; postUserId: number }>
    ) {
      state.followLoading = null;
      state.userData.Followings.push({
        id: action.payload.postUserId,
        nickname: '아무나',
      });
    },

    followFailure(state: UserState, action: PayloadAction<string>) {
      state.followLoading = null;
      state.followError = action.payload;
    },

    unFollowRequest(
      state: UserState,
      action: PayloadAction<FollowRequestPayload>
    ) {
      state.followLoading = action.payload.postId;
      state.unFollowError = null;
    },

    unFollowSuccess(
      state: UserState,
      action: PayloadAction<FollowRequestPayload>
    ) {
      state.followLoading = null;
      state.userData.Followings = state.userData.Followings.filter(
        following => following.id !== action.payload.postUserId
      );
    },

    unFollowFailure(state: UserState, action: PayloadAction<string>) {
      state.followLoading = null;
      state.unFollowError = action.payload;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = userSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  addUserPost,
  removeUserPost,
  followRequest,
  followSuccess,
  followFailure,
  unFollowRequest,
  unFollowSuccess,
  unFollowFailure,
} = actions;
export default reducer;
