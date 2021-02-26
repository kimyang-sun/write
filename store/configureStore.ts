import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from 'store/modules';

const store = () => {
  const devMode = process.env.NODE_ENV === 'development'; // 개발모드
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: devMode,
  });
  return store;
};

const wrapper = createWrapper(store, {
  // 이 부분이 true면 디버그때 자세한 설명이 나옵니다. (개발할때는 true로)
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
