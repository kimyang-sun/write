import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { loginAction, loginActionType, logoutAction } from './user';

// 커스텀 훅
export default function useUser() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const login = useCallback((data: loginActionType) => {
    dispatch(loginAction(data));
  }, []);
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoggedIn, login, logout };
}
