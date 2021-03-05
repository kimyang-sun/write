import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type UserState = {
  userLoading: boolean;
  userData: UserDataPayload;
  signUpData: SignUpDataPayload;
  loginData: any;
  error: any;
};

// Follow 타입
export type Follow = {
  name: string;
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
  Posts: any[];
  Followers: Follow[];
  Followings: Follow[];
};

export type SignUpRequestPayload = {
  userEmail: string;
  nickname: string;
  password: string;
};

export type SignUpDataPayload = {
  signUpLoading: boolean;
};

// 초기 상태
const initialState: UserState = {
  userLoading: false,
  userData: null,
  signUpData: {
    signUpLoading: false,
  },
  loginData: {},
  error: null,
};

// 리듀서 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest(state: UserState, action: PayloadAction<LoginRequestPayload>) {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<SignUpRequestPayload>
    ) {
      state.signUpData.signUpLoading = true;
      state.error = null;
    },

    signUpSuccess(state: UserState, action: PayloadAction<SignUpDataPayload>) {
      state.signUpData.signUpLoading = false;
      state.signUpData = action.payload;
    },

    signUpFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.signUpData.signUpLoading = false;
      state.error = action.payload;
    },

    // Change Profile
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
} = actions;
export default reducer;
