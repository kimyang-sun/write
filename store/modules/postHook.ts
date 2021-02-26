import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { addPostAction, AddPostPayload } from './post';

export default function usePost() {
  const { mainPosts } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const addPost = useCallback((post: AddPostPayload) => {
    dispatch(addPostAction(post));
  }, []);

  return { mainPosts, addPost };
}
