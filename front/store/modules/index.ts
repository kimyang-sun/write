import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';
import { PostState } from './post';
import user, { UserState } from './user';
import post from './post';

// 루트 리듀서 리듀서 타입
type RootStateType = {
  user: UserState;
  post: PostState;
};

// 루트 리듀서
const rootReducer = (state: RootStateType, action: AnyAction) => {
  switch (action.type) {
    // HYDRATE를 추가해주기 위해 switch로 추가해줬습니다.
    // 서버에서 생성한 스토어의 상태를 클라이언트에 합쳐주는 작업
    case HYDRATE:
      return action.payload;

    default: {
      const combineReducer = combineReducers({ user, post });
      return combineReducer(state, action);
    }
  }
};

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
