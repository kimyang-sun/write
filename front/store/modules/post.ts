import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type PostState = {
  mainPosts: any[];
  imagePaths: string[];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: string;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: string;
  unLikePostLoading: boolean;
  unLikePostDone: boolean;
  unLikePostError: string;
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
  Images: { src: string }[];
  createdAt: string;
  Comments: PostComment[];
  User: {
    id: number;
    nickname: string;
    avatar: string | null;
  };
  Likers: { id: number }[];
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
  createdAt: string;
  User: {
    id: number;
    nickname: string;
    avatar: string | null;
  };
};

export type CommentActionType = {
  postId: number;
  content: string;
};

// 초기 상태
const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
};

// 리듀서 슬라이스
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Load Post
    loadPostsRequest(state: PostState) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },

    loadPostsSuccess(state: PostState, action: PayloadAction<Post[]>) {
      console.log(action.payload);
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = state.mainPosts.length < 16;
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
    },

    loadPostsFailure(state: PostState, action: PayloadAction<string>) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
    },

    // Add Post
    addPostRequest(state: PostState, _action: PayloadAction<PostPayloadType>) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },

    addPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.mainPosts.unshift(action.payload);
      state.addPostLoading = false;
      state.addPostDone = true;
    },

    addPostComplete(state: PostState) {
      state.addPostDone = false;
    },

    addPostFailure(state: PostState, action: PayloadAction<string>) {
      state.addPostLoading = false;
      state.addPostError = action.payload;
    },

    // Remove Post
    removePostRequest(
      state: PostState,
      _action: PayloadAction<{ postId: number }>
    ) {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = null;
    },

    removePostSuccess(
      state: PostState,
      action: PayloadAction<{ postId: number }>
    ) {
      state.mainPosts = state.mainPosts.filter(
        post => post.id !== action.payload.postId
      );
      state.removePostLoading = false;
      state.removePostDone = true;
    },

    removePostFailure(state: PostState, action: PayloadAction<string>) {
      state.addPostLoading = false;
      state.removePostError = action.payload;
    },

    // Add Comment
    addCommentRequest(
      state: PostState,
      _action: PayloadAction<CommentActionType>
    ) {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },

    addCommentSuccess(
      state: PostState,
      action: PayloadAction<{
        content: string;
        PostId: number | string;
        UserId: number;
      }>
    ) {
      const post = state.mainPosts.find(
        post => post.id === action.payload.PostId
      );
      post.Comments.push(action.payload);
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },

    addCommentFailure(state: PostState, action: PayloadAction<string>) {
      console.error(action.payload);
      state.addCommentLoading = false;
      state.addCommentError = action.payload;
    },

    // Like Post
    likePostRequest(state: PostState, _action: PayloadAction<number>) {
      state.likePostLoading = true;
      state.likePostDone = false;
      state.likePostError = null;
    },

    likePostSuccess(
      state: PostState,
      action: PayloadAction<{ PostId: number; UserId: number }>
    ) {
      const post = state.mainPosts.find(
        post => post.id === action.payload.PostId
      );
      post.Likers.push({ id: action.payload.UserId });
      state.likePostLoading = false;
      state.likePostDone = true;
    },

    likePostFailure(state: PostState, action: PayloadAction<string>) {
      state.likePostLoading = false;
      state.likePostError = action.payload;
    },

    // Unlike Post
    unLikePostRequest(state: PostState, _action: PayloadAction<number>) {
      state.unLikePostLoading = true;
      state.unLikePostDone = false;
      state.unLikePostError = null;
    },

    unLikePostSuccess(
      state: PostState,
      action: PayloadAction<{ PostId: number; UserId: number }>
    ) {
      const post = state.mainPosts.find(
        post => post.id === action.payload.PostId
      );
      post.Likers = post.Likers.filter(
        user => user.id !== action.payload.UserId
      );
      state.unLikePostLoading = false;
      state.unLikePostDone = true;
    },

    unLikePostFailure(state: PostState, action: PayloadAction<string>) {
      state.unLikePostLoading = false;
      state.unLikePostError = action.payload;
    },
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
  likePostRequest,
  likePostSuccess,
  likePostFailure,
  unLikePostRequest,
  unLikePostSuccess,
  unLikePostFailure,
} = actions;
export default reducer;
