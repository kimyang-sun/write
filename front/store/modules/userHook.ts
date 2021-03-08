import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  loginRequest,
  LoginRequestPayload,
  logoutRequest,
  signUpRequest,
  followRequest,
  unFollowRequest,
  SignUpRequestPayload,
} from './user';

// 커스텀 훅
export default function useUser() {
  const { userData, userLoading, followLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const login = useCallback((data: LoginRequestPayload) => {
    dispatch(loginRequest(data));
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const signUp = useCallback((data: SignUpRequestPayload) => {
    dispatch(signUpRequest(data));
  }, []);

  const follow = useCallback((ids: { postId: number; postUserId: number }) => {
    dispatch(followRequest(ids));
  }, []);

  const unFollow = useCallback(
    (ids: { postId: number; postUserId: number }) => {
      dispatch(unFollowRequest(ids));
    },
    []
  );

  return {
    userLoading,
    userData,
    login,
    logout,
    signUp,
    followLoading,
    follow,
    unFollow,
  };
}
