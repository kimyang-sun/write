import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from 'store/modules';
import createSagaMiddleware, { Task } from 'redux-saga';
import { Store } from 'redux';
import rootSaga from 'sagas';

// Next Redux Toolkit Saga를 사용하기 위해
// TypeScript에서 강제로 sagaTask를 만들어주기 위함 (안하면 타입오류남)
export interface SagaStore extends Store {
  sagaTask?: Task;
}

const store = () => {
  const devMode = process.env.NODE_ENV === 'development'; // 개발모드
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: devMode,
  });
  // cofigureStore가 아닌 createStore일 때
  // const enhancer = process.env.NODE_ENV === 'production'
  // ? compose(applyMiddleware(...middlewares))
  // : composeWithDevTools(applyMiddleware(...middlewares));
  // const store = createStore(reducer, enhancer);

  // 그냥 Next에 Redux saga를 사용할 때
  // store.sagaTask = sagaMiddleware.run(rootSaga);

  // Next에 Redux Toolkit으로 saga를 사용해야할 때
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(store, {
  // 이 부분이 true면 디버그때 자세한 설명이 나옵니다. (개발할때는 true로)
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
