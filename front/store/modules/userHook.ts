import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import {
  loadMyInfoRequest,
  loginRequest,
  LoginRequestPayload,
  logoutRequest,
  signUpRequest,
  changeProfileRequest,
  followRequest,
  unFollowRequest,
  SignUpRequestPayload,
  ProfilePayload,
  loadFollowingsRequest,
  loadFollowersRequest,
  removeFollowerRequest,
} from './user';

// 커스텀 훅
export default function useUser() {
  const {
    userData,
    loginLoading,
    loginError,
    logoutLoading,
    logoutError,
    changeProfileLoading,
    followLoading,
    unFollowLoading,
    signUpLoading,
    signUpDone,
    signUpError,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const loadMyInfo = useCallback(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  const login = useCallback((data: LoginRequestPayload) => {
    dispatch(loginRequest(data));
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const changeProfile = useCallback((data: ProfilePayload) => {
    dispatch(changeProfileRequest(data));
  }, []);

  const signUp = useCallback((data: SignUpRequestPayload) => {
    dispatch(signUpRequest(data));
  }, []);

  const follow = useCallback((id: number) => {
    dispatch(followRequest(id));
  }, []);

  const unFollow = useCallback((id: number) => {
    dispatch(unFollowRequest(id));
  }, []);

  const removeFollower = useCallback((id: number) => {
    dispatch(removeFollowerRequest(id));
  }, []);

  const loadFollowers = useCallback(() => {
    dispatch(loadFollowersRequest());
  }, []);

  const loadFollwings = useCallback(() => {
    dispatch(loadFollowingsRequest());
  }, []);

  return {
    loadMyInfo,
    loginLoading,
    loginError,
    logoutLoading,
    logoutError,
    userData,
    login,
    logout,
    changeProfileLoading,
    changeProfile,
    signUpLoading,
    signUpDone,
    signUpError,
    signUp,
    followLoading,
    unFollowLoading,
    follow,
    unFollow,
    removeFollower,
    loadFollowers,
    loadFollwings,
  };
}
