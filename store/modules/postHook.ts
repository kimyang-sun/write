import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { addPostRequest, Post } from './post';

export default function usePost() {
  const { mainPosts, imagePaths, addPostDone, addCommentDone } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch();
  const addPost = useCallback(
    (post: Post) => {
      dispatch(addPostRequest(post));
    },
    [dispatch]
  );

  return { mainPosts, imagePaths, addPost, addPostDone, addCommentDone };
}
