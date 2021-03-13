import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type UserState = {
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: string;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: string;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: string;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string;
  followLoading: number;
  followDone: boolean;
  followError: string;
  unFollowDone: boolean;
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
  avatar: string | null;
  nickname: string;
  introduction: string | null;
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
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  followLoading: null,
  followDone: false,
  followError: null,
  unFollowError: null,
  unFollowDone: false,
  userData: null,
};

// 리듀서 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Load login info
    loadMyInfoRequest(state: UserState) {
      state.loadUserLoading = true;
      state.loadUserDone = false;
      state.loadUserError = null;
    },

    loadMyInfoSuccess(
      state: UserState,
      action: PayloadAction<UserDataPayload>
    ) {
      state.userData = action.payload;
      state.loadUserLoading = false;
      state.loadUserDone = true;
    },

    loadMyInfoFailure(state: UserState, action: PayloadAction<string>) {
      state.loadUserLoading = false;
      state.loadUserError = action.payload;
    },

    // Login
    loginRequest(
      state: UserState,
      _action: PayloadAction<LoginRequestPayload>
    ) {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    },

    loginSuccess(state: UserState, action: PayloadAction<UserDataPayload>) {
      state.userData = action.payload;
      state.loginLoading = false;
      state.loginDone = true;
    },

    loginFailure(state: UserState, action: PayloadAction<string>) {
      state.loginLoading = false;
      state.loginError = action.payload;
    },

    // Logout
    logoutRequest(state: UserState) {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },

    logoutSuccess(state: UserState) {
      state.userData = null;
      state.signUpDone = false;
      state.logoutLoading = false;
      state.logoutDone = true;
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
      state.signUpError = action.payload;
      state.signUpLoading = false;
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
      state.followDone = false;
      state.followError = null;
    },

    followSuccess(
      state: UserState,
      action: PayloadAction<{ postId: number; postUserId: number }>
    ) {
      state.userData.Followings.push({
        id: action.payload.postUserId,
        nickname: '아무나',
      });
      state.followLoading = null;
      state.followDone = true;
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
      state.unFollowDone = false;
      state.unFollowError = null;
    },

    unFollowSuccess(
      state: UserState,
      action: PayloadAction<FollowRequestPayload>
    ) {
      state.userData.Followings = state.userData.Followings.filter(
        following => following.id !== action.payload.postUserId
      );
      state.followLoading = null;
      state.unFollowDone = true;
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
  loadMyInfoRequest,
  loadMyInfoSuccess,
  loadMyInfoFailure,
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
