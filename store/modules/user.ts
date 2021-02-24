import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 타입
type userState = {
  isLoggedIn: boolean;
  userData: any;
  signUpData: any;
  loginData: any;
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
    loginAction(state: userState) {
      state.isLoggedIn = true;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = userSlice;
export const { loginAction } = actions;
export default reducer;
