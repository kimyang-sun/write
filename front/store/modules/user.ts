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
  changeProfileLoading: boolean;
  changeProfileDone: boolean;
  changeProfileError: string;
  followLoading: boolean;
  followDone: boolean;
  followError: string;
  unFollowLoading: boolean;
  unFollowDone: boolean;
  unFollowError: string;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: string;
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: string;
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: string;
  userData: UserDataPayload;
};

// Follow 타입
export type Follow = {
  id: number;
  nickname?: string;
  avatar?: string | null;
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
  Posts: { id: number }[];
  Followers: Follow[];
  Followings: Follow[];
};

export type SignUpRequestPayload = {
  email: string;
  nickname: string;
  password: string;
};

export type ProfilePayload = {
  nickname: string;
  introduction: string | null;
  avatar: string | null;
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
  changeProfileLoading: false,
  changeProfileDone: false,
  changeProfileError: null,
  followLoading: null,
  followDone: false,
  followError: null,
  unFollowLoading: false,
  unFollowDone: false,
  unFollowError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
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
      console.log(action.payload);
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
    addUserPost(state: UserState, action: PayloadAction<{ id: number }>) {
      state.userData.Posts.unshift(action.payload);
    },

    removeUserPost(
      state: UserState,
      action: PayloadAction<{ PostId: number }>
    ) {
      state.userData.Posts = state.userData.Posts.filter(
        post => post.id !== action.payload.PostId
      );
    },

    // Change Profile
    changeProfileRequest(
      state: UserState,
      _action: PayloadAction<ProfilePayload>
    ) {
      state.changeProfileLoading = true;
      state.changeProfileDone = false;
      state.changeProfileError = null;
    },

    changeProfileSuccess(
      state: UserState,
      action: PayloadAction<ProfilePayload>
    ) {
      state.userData.nickname = action.payload.nickname;
      state.userData.introduction = action.payload.introduction;
      state.userData.avatar = action.payload.avatar;
      state.changeProfileLoading = false;
      state.changeProfileDone = true;
    },

    changeProfileFailure(state: UserState, action: PayloadAction<string>) {
      state.changeProfileError = action.payload;
      state.changeProfileLoading = false;
    },

    // Follow
    followRequest(state: UserState, _action: PayloadAction<number>) {
      state.followLoading = true;
      state.followDone = false;
      state.followError = null;
    },

    followSuccess(state: UserState, action: PayloadAction<{ UserId: number }>) {
      state.userData.Followings.push({ id: action.payload.UserId });
      state.followLoading = false;
      state.followDone = true;
    },

    followFailure(state: UserState, action: PayloadAction<string>) {
      state.followLoading = false;
      state.followError = action.payload;
    },

    // Unfollow
    unFollowRequest(state: UserState, _action: PayloadAction<number>) {
      state.unFollowLoading = true;
      state.unFollowDone = false;
      state.unFollowError = null;
    },

    unFollowSuccess(
      state: UserState,
      action: PayloadAction<{ UserId: number }>
    ) {
      state.userData.Followings = state.userData.Followings.filter(
        following => following.id !== action.payload.UserId
      );
      state.unFollowLoading = false;
      state.unFollowDone = true;
    },

    unFollowFailure(state: UserState, action: PayloadAction<string>) {
      state.unFollowLoading = false;
      state.unFollowError = action.payload;
    },

    // Remove Follower
    removeFollowerRequest(state: UserState, _action: PayloadAction<number>) {
      state.removeFollowerLoading = true;
      state.removeFollowerDone = false;
      state.removeFollowerError = null;
    },

    removeFollowerSuccess(
      state: UserState,
      action: PayloadAction<{ UserId: number }>
    ) {
      state.userData.Followers = state.userData.Followers.filter(
        follower => follower.id !== action.payload.UserId
      );
      state.removeFollowerLoading = false;
      state.removeFollowerDone = true;
    },

    removeFollowerFailure(state: UserState, action: PayloadAction<string>) {
      state.removeFollowerLoading = false;
      state.removeFollowerError = action.payload;
    },

    // Load Followers
    loadFollowersRequest(state: UserState) {
      state.loadFollowersLoading = true;
      state.loadFollowersDone = false;
      state.loadFollowersError = null;
    },

    loadFollowersSuccess(state: UserState, action: PayloadAction<any>) {
      state.userData.Followers = action.payload;
      state.loadFollowersLoading = false;
      state.loadFollowersDone = true;
    },

    loadFollowersFailure(state: UserState, action: PayloadAction<string>) {
      state.loadFollowersLoading = null;
      state.loadFollowersError = action.payload;
    },

    // Load Followings
    loadFollowingsRequest(state: UserState) {
      state.loadFollowingsLoading = true;
      state.loadFollowingsDone = false;
      state.loadFollowingsError = null;
    },

    loadFollowingsSuccess(state: UserState, action: PayloadAction<any>) {
      state.userData.Followings = action.payload;
      state.loadFollowingsLoading = false;
      state.loadFollowingsDone = true;
    },

    loadFollowingsFailure(state: UserState, action: PayloadAction<string>) {
      state.loadFollowingsLoading = null;
      state.loadFollowingsError = action.payload;
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
  changeProfileRequest,
  changeProfileSuccess,
  changeProfileFailure,
  addUserPost,
  removeUserPost,
  followRequest,
  followSuccess,
  followFailure,
  unFollowRequest,
  unFollowSuccess,
  unFollowFailure,
  removeFollowerRequest,
  removeFollowerSuccess,
  removeFollowerFailure,
  loadFollowersRequest,
  loadFollowersSuccess,
  loadFollowersFailure,
  loadFollowingsRequest,
  loadFollowingsSuccess,
  loadFollowingsFailure,
} = actions;
export default reducer;
