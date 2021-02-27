import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { addPostAction, Post } from './post';

export default function usePost() {
  const { mainPosts, imagePaths } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch();
  const addPost = useCallback((post: Post) => {
    dispatch(addPostAction(post));
  }, []);

  return { mainPosts, imagePaths, addPost };
}
