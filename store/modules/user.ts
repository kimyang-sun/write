import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type UserState = {
  userLoading: boolean;
  signUpLoading: boolean;
  followLoading: number;
  userData: UserDataPayload;
  signUpData: any;
  loginData: any;
  error: any;
};

// Follow 타입
export type Follow = {
  id: number;
  nickname: string;
};

// 액션 Payload 타입
export type LoginRequestPayload = {
  userEmail: string;
  password: string;
};

export type UserDataPayload = {
  id: number;
  userEmail: string;
  nickname: string;
  description: string;
  Posts: { postId: number }[];
  Followers: Follow[];
  Followings: Follow[];
};

export type SignUpRequestPayload = {
  userEmail: string;
  nickname: string;
  password: string;
};

export type FollowRequestPayload = {
  postId: number;
  postUserId: number;
};

// 초기 상태
const initialState: UserState = {
  userLoading: false,
  signUpLoading: false,
  followLoading: null,
  userData: null,
  signUpData: {},
  loginData: {},
  error: null,
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
      state.userLoading = true;
      state.error = null;
    },

    loginSuccess(state: UserState, action: PayloadAction<UserDataPayload>) {
      state.userLoading = false;
      state.userData = action.payload;
    },

    loginFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.userLoading = false;
      state.error = action.payload;
    },

    // Logout
    logoutRequest(state: UserState) {
      state.userLoading = true;
      state.error = null;
    },

    logoutSuccess(state: UserState) {
      state.userLoading = false;
      state.userData = null;
    },

    logoutFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.userLoading = false;
      state.error = action.payload;
    },

    // Sign up
    signUpRequest(
      state: UserState,
      _action: PayloadAction<SignUpRequestPayload>
    ) {
      state.signUpLoading = true;
      state.error = null;
    },

    signUpSuccess(state: UserState, action: PayloadAction<any>) {
      state.signUpLoading = false;
      state.signUpData = action.payload;
    },

    signUpFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.signUpLoading = false;
      state.error = action.payload;
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
      state.error = null;
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

    followFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.followLoading = null;
      state.error = action.payload;
    },

    unFollowRequest(
      state: UserState,
      action: PayloadAction<FollowRequestPayload>
    ) {
      state.followLoading = action.payload.postId;
      state.error = null;
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

    unFollowFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.followLoading = null;
      state.error = action.payload;
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
