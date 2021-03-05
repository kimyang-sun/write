import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { loginRequest, LoginRequestPayload, logoutRequest } from './user';

// 커스텀 훅
export default function useUser() {
  const { userData, userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const login = useCallback((data: LoginRequestPayload) => {
    dispatch(loginRequest(data));
  }, []);
  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return { userLoading, userData, login, logout };
}
