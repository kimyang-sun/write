import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type UserState = {
  isLoggedIn: boolean;
  userData: any;
  signUpData: any;
  loginData: any;
};

// 액션 타입
export type LoginActionType = {
  userId: string;
  password: string;
};

// 초기 상태
const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
  signUpData: {},
  loginData: {},
};

// 리듀서 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction(state: UserState, action: PayloadAction<LoginActionType>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutAction(state: UserState) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
