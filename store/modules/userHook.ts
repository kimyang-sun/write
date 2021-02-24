import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { loginAction } from './user';

// 커스텀 훅
export default function useUser() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const login = () => {
    dispatch(loginAction());
  };

  return { isLoggedIn, login };
}
