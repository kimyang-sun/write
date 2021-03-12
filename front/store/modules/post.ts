import shortId from 'shortid';
import faker from 'faker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type PostState = {
  mainPosts: any[];
  imagePaths: string[];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  addPostLoading: boolean;
  addPostDone: boolean;
  removePostLoading: boolean;
  removePostDone: boolean;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  error: any;
};

// Post 타입
// 대문자 소문자는 소문자 id, content 등은 게시글 자체의 속성이고
// User, Images, Comments 이런건 다른 정보들과 합쳐서 주기 때문에 대문자입니다.
// 이 경우에는 서버 개발자와 사전에 협의를 봐서 대문자로 구분할건지 전부 소문자로 할건지 정해야 합니다.
export type Post = {
  id: number;
  UserId: string;
  content: string;
  tag: string;
  Images?: { src: string }[];
  date: string;
  Comments?: PostComment[];
};

type PostPayloadType = {
  content: string;
  tag: string;
};

// 댓글 타입
export type PostComment = {
  PostId: number;
  UserId: number;
  content: string;
};

export type CommentActionType = {
  postId: number;
  userId: number;
  content: string;
};

// 초기 상태
const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  addPostLoading: false,
  addPostDone: false,
  removePostLoading: false,
  removePostDone: false,
  addCommentLoading: false,
  addCommentDone: false,
  error: null,
};

// 더미 데이터
export const generateDummyPost = (num: number) =>
  Array(num)
    .fill(0)
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      tag: '#쓰다 #마음',
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      date: '2021.03.06',
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

// 리듀서 슬라이스
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Load Post
    loadPostsRequest(state: PostState, _action: PayloadAction<any[]>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.error = null;
    },

    loadPostsSuccess(state: PostState, action: PayloadAction<any[]>) {
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.hasMorePosts = state.mainPosts.length < 16;
    },

    loadPostsFailure(state: PostState, action: PayloadAction<{ error: any }>) {
      state.loadPostsLoading = false;
      state.error = action.payload;
    },

    // Add Post
    addPostRequest(state: PostState, _action: PayloadAction<PostPayloadType>) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.error = null;
    },

    addPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.mainPosts.unshift(action.payload);
      state.addPostLoading = false;
      state.addPostDone = true;
    },

    addPostComplete(state: PostState) {
      state.addPostDone = false;
    },

    addPostFailure(state: PostState, action: PayloadAction<{ error: any }>) {
      state.addPostLoading = false;
      state.error = action.payload;
    },

    // Remove Post
    removePostRequest(
      state: PostState,
      _action: PayloadAction<{ postId: number }>
    ) {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.error = null;
    },

    removePostSuccess(
      state: PostState,
      action: PayloadAction<{ postId: number }>
    ) {
      console.log('remove');
      state.mainPosts = state.mainPosts.filter(
        post => post.id !== action.payload.postId
      );
      state.removePostLoading = false;
      state.removePostDone = true;
    },

    removePostFailure(state: PostState, action: PayloadAction<{ error: any }>) {
      state.addPostLoading = false;
      state.error = action.payload;
    },

    // Add Comment
    addCommentRequest(
      state: PostState,
      _action: PayloadAction<CommentActionType>
    ) {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.error = null;
    },

    addCommentSuccess(
      state: PostState,
      action: PayloadAction<{ content: string; PostId: number; UserId: number }>
    ) {
      const post = state.mainPosts.find(
        post => post.id === action.payload.PostId
      );
      post.Comments.push(action.payload);
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },

    addCommentFailure(state: PostState, action: PayloadAction<{ error: any }>) {
      state.addCommentLoading = false;
      state.error = action.payload;
    },

    // Remove Comment
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = postSlice;
export const {
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostComplete,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} = actions;
export default reducer;
