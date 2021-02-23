import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

const configureStore = () => {};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development', // 이 부분이 true면 디버그때 자세한 설명이 나옵니다. (개발할때는 true로)
});

export default wrapper;
