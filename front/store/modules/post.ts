import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type PostState = {
  mainPosts: Post[];
  singlePost: Post;
  imagePaths: string[];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: any;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: any;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  uploadPostImageLoading: boolean;
  uploadPostImageDone: boolean;
  uploadPostImageError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: any;
  unLikePostLoading: boolean;
  unLikePostDone: boolean;
  unLikePostError: any;
  scrapPostLoading: boolean;
  scrapPostDone: boolean;
  scrapPostError: any;
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
  ScrapId?: number;
  Scrap?: {
    content: string;
    tag: string;
    User: {
      id: number;
      nickname: string;
      avatar: string | null;
    };
    Images: { src: string }[];
    createdAt: string;
  };
};

export type AddPostType = {
  image: string[] | null;
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
  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  uploadPostImageLoading: false,
  uploadPostImageDone: false,
  uploadPostImageError: null,
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
  scrapPostLoading: false,
  scrapPostDone: false,
  scrapPostError: null,
};

// 리듀서 슬라이스
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Load Posts
    loadPostsRequest(state: PostState, _action: PayloadAction<number>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadPostsSuccess(state: PostState, action: PayloadAction<Post[]>) {
      state.mainPosts = state.mainPosts.concat(action.payload);
      // 게시글이 5개가 안되면 다음 게시글이 없다고 판단
      state.hasMorePosts = action.payload.length === 5;
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
    },
    loadPostsFailure(state: PostState, action: PayloadAction<any>) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
    },

    // Load User Posts
    loadUserPostsRequest(state: PostState, _action: PayloadAction<any>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadUserPostsSuccess(state: PostState, action: PayloadAction<Post[]>) {
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = action.payload.length === 5;
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
    },
    loadUserPostsFailure(state: PostState, action: PayloadAction<any>) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
    },

    // Load Hashtag Posts
    loadHashtagPostsRequest(state: PostState, _action: PayloadAction<any>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadHashtagPostsSuccess(state: PostState, action: PayloadAction<Post[]>) {
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = action.payload.length === 5;
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
    },
    loadHashtagPostsFailure(state: PostState, action: PayloadAction<any>) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
    },

    // Load Post
    loadPostRequest(state: PostState, _action: PayloadAction<any>) {
      state.loadPostLoading = true;
      state.loadPostDone = false;
      state.loadPostError = null;
    },
    loadPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.singlePost = action.payload;
      state.loadPostLoading = false;
      state.loadPostDone = true;
    },
    loadPostFailure(state: PostState, action: PayloadAction<any>) {
      state.loadPostLoading = false;
      state.loadPostError = action.payload;
    },

    // Add Post
    addPostRequest(state: PostState, _action: PayloadAction<AddPostType>) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.mainPosts.unshift(action.payload);
      state.imagePaths = [];
      state.addPostLoading = false;
      state.addPostDone = true;
    },
    addPostComplete(state: PostState) {
      state.addPostDone = false;
    },
    addPostFailure(state: PostState, action: PayloadAction<any>) {
      state.addPostLoading = false;
      state.addPostError = action.payload;
    },

    // Upload Post Image
    uploadPostImageRequest(state: PostState, _action: PayloadAction<FormData>) {
      state.uploadPostImageLoading = true;
      state.uploadPostImageDone = false;
      state.uploadPostImageError = null;
    },
    uploadPostImageSuccess(state: PostState, action: PayloadAction<string>) {
      state.imagePaths = state.imagePaths.concat(action.payload);
      state.uploadPostImageLoading = false;
      state.uploadPostImageDone = true;
    },
    uploadPostImageFailure(state: PostState, action: PayloadAction<any>) {
      state.uploadPostImageLoading = false;
      state.uploadPostImageError = action.payload;
    },

    // Rmove Post Image
    removeUploadedPostImage(state: PostState, action: PayloadAction<number>) {
      state.imagePaths = state.imagePaths.filter(
        (_image, index) => index !== action.payload
      );
    },

    // Remove Post
    removePostRequest(state: PostState, _action: PayloadAction<number>) {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = null;
    },
    removePostSuccess(
      state: PostState,
      action: PayloadAction<{ PostId: number }>
    ) {
      state.mainPosts = state.mainPosts.filter(
        post => post.id !== action.payload.PostId
      );
      state.removePostLoading = false;
      state.removePostDone = true;
    },
    removePostFailure(state: PostState, action: PayloadAction<any>) {
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
    addCommentSuccess(state: PostState, action: PayloadAction<PostComment>) {
      const post = state.mainPosts.find(
        post => post.id === action.payload.PostId
      );
      post.Comments.push(action.payload);
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },
    addCommentFailure(state: PostState, action: PayloadAction<any>) {
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
    likePostFailure(state: PostState, action: PayloadAction<any>) {
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
    unLikePostFailure(state: PostState, action: PayloadAction<any>) {
      state.unLikePostLoading = false;
      state.unLikePostError = action.payload;
    },

    // scrapPost
    scrapPostRequest(state: PostState, _action: PayloadAction<number>) {
      state.scrapPostLoading = true;
      state.scrapPostDone = false;
      state.scrapPostError = null;
    },
    scrapPostSuccess(state: PostState, action: PayloadAction<any>) {
      state.mainPosts.unshift(action.payload);
      state.scrapPostLoading = false;
      state.scrapPostDone = true;
    },
    scrapPostFailure(state: PostState, action: PayloadAction<any>) {
      state.scrapPostLoading = false;
      state.scrapPostError = action.payload;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = postSlice;
export const {
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  loadPostRequest,
  loadPostSuccess,
  loadPostFailure,
  loadUserPostsRequest,
  loadUserPostsSuccess,
  loadUserPostsFailure,
  loadHashtagPostsRequest,
  loadHashtagPostsSuccess,
  loadHashtagPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostComplete,
  addPostFailure,
  uploadPostImageRequest,
  uploadPostImageSuccess,
  uploadPostImageFailure,
  removeUploadedPostImage,
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
  scrapPostRequest,
  scrapPostSuccess,
  scrapPostFailure,
} = actions;
export default reducer;
