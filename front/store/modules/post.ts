import shortId from 'shortid';
import faker from 'faker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type PostState = {
  mainPosts: Post[];
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
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  hashtag: string;
  Images: { src: string }[];
  date: string;
  Comments: PostComment[];
};

// 댓글 타입
export type PostComment = {
  id: number;
  User: { id: number; nickname: string };
  content: string;
};

export type CommentActionType = {
  id: number;
  postId: number;
  User: { id: number; nickname: string };
  content: string;
};

// 초기 상태
const initialState: PostState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '선양',
      },
      content:
        '늙는 것도, 죽는 것도 인간이라는 덧없는 생물의 아름다움이다. 늙기 때문에, 죽기 때문에 견딜 수 없이 사랑스럽고 존귀한거다.',
      hashtag: '#쓰다 #마음',
      Images: [
        { src: 'https://picsum.photos/600/600' },
        { src: 'https://picsum.photos/400/400' },
        { src: 'https://picsum.photos/500/500' },
      ],
      date: '2021.03.06',
      Comments: [
        {
          id: 1,
          User: {
            id: 2,
            nickname: '태연',
          },
          content: '첫번째 댓글 테스트입니다.',
        },
        {
          id: 2,
          User: {
            id: 3,
            nickname: '병관',
          },
          content: '두번째 댓글 테스트입니다.',
        },
      ],
    },
  ],
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
      hashtag: '#쓰다 #마음',
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
    loadPostsRequest(state: PostState, _action: PayloadAction<Post[]>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.error = null;
    },

    loadPostsSuccess(state: PostState, action: PayloadAction<Post[]>) {
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
    addPostRequest(state: PostState, _action: PayloadAction<Post>) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.error = null;
    },

    addPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.mainPosts.unshift(action.payload);
      state.addPostLoading = false;
      state.addPostDone = true;
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
      action: PayloadAction<CommentActionType>
    ) {
      const post = state.mainPosts.find(
        post => post.id === action.payload.postId
      );
      const comment: PostComment = {
        id: action.payload.id,
        User: action.payload.User,
        content: action.payload.content,
      };
      post.Comments.push(comment);
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
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} = actions;
export default reducer;
