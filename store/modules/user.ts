import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
type userState = {
  isLoggedIn: boolean;
  userData: any;
  signUpData: any;
  loginData: any;
};

// 로그인 액션 타입
export type loginActionType = {
  userId: string;
  password: string;
};

// 초기 상태
const initialState: userState = {
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
    loginAction(state: userState, action: PayloadAction<loginActionType>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutAction(state: userState) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
