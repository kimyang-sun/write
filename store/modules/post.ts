import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type PostState = {
  mainPosts: Post[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  error: any;
};

// Post 타입
// 대문자 소문자는 소문자 id, content 등은 게시글 자체의 속성이고
// User, Images, Comments 이런건 다른 정보들과 합쳐서 주기 때문에 대문자입니다.
// 이 경우에는 서버 개발자와 사전에 협의를 봐서 대문자로 구분할건지 전부 소문자로 할건지 정해야 합니다.
export type Post = {
  postId: number;
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
  commentId: number;
  User: { id: number; nickname: string };
  content: string;
};

// 초기 상태
const initialState: PostState = {
  mainPosts: [
    {
      postId: 1,
      User: {
        id: 1,
        nickname: '선양',
      },
      content:
        '늙는 것도, 죽는 것도 인간이라는 덧없는 생물의 아름다움이다. <br>늙기 때문에, 죽기 때문에 견딜 수 없이 사랑스럽고 존귀한거다. 늙는 것도, 죽는 것도 인간이라는 덧없는 생물의 아름다움이다. <br>늙기 때문에, 죽기 때문에 견딜 수 없이 사랑스럽고 존귀한거다. 늙는 것도, 죽는 것도 인간이라는 덧없는 생물의 아름다움이다. <br>늙기 때문에, 죽기 때문에 견딜 수 없이 사랑스럽고 존귀한거다. 늙는 것도, 죽는 것도 인간이라는 덧없는 생물의 아름다움이다. <br>늙기 때문에, 죽기 때문에 견딜 수 없이 사랑스럽고 존귀한거다.',
      hashtag: '#쓰다 #마음',
      Images: [
        { src: 'https://picsum.photos/600/600' },
        { src: 'https://picsum.photos/400/400' },
        { src: 'https://picsum.photos/500/500' },
      ],
      date: '2021년 03월 06일 토요일',
      Comments: [
        {
          commentId: 1,
          User: {
            id: 2,
            nickname: '태연',
          },
          content: '첫번째 댓글 테스트입니다.',
        },
        {
          commentId: 2,
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
  addPostLoading: false,
  addPostDone: false,
  addCommentLoading: false,
  addCommentDone: false,
  error: null,
};

const dummyPost = {
  postId: 2,
  User: {
    id: 1,
    nickname: '선양',
  },
  content: '첫 번째 게시글 #해시태그 #익스프레스',
  hashtag: '#쓰다 #마음',
  Images: [
    { src: 'https://picsum.photos/200/300' },
    { src: 'https://picsum.photos/200/300' },
    { src: 'https://picsum.photos/200/300' },
  ],
  Comments: [
    {
      User: {
        id: 2,
        nickname: '태연',
      },
      content: '첫번째 댓글 테스트입니다.',
    },
    {
      User: {
        id: 3,
        nickname: '병관',
      },
      content: '두번째 댓글 테스트입니다.',
    },
  ],
};

// 리듀서 슬라이스
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Add Post
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addPostRequest(state: PostState, action: PayloadAction<Post>) {
      state.addPostLoading = true;
      state.error = null;
    },

    addPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.addPostLoading = false;
      state.mainPosts.unshift(action.payload);
      state.addPostDone = true;
    },

    addPostFailure(state: PostState, action: PayloadAction<{ error: any }>) {
      state.addPostLoading = false;
      state.error = action.payload;
    },

    // Add Comment
    addCommentRequest(state: PostState, action: PayloadAction<PostComment>) {
      state.addCommentLoading = true;
      state.error = null;
      state.addCommentDone = false;
    },

    addCommentSuccess(state: PostState, action: PayloadAction<PostComment>) {
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },

    addCommentFailure(state: PostState, action: PayloadAction<{ error: any }>) {
      state.addCommentLoading = false;
      state.error = action.payload;
      state.addCommentDone = false;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = postSlice;
export const {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} = actions;
export default reducer;
