import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
export type PostState = {
  mainPosts: Post[];
  imagePaths: string[];
  postAdded: boolean;
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
  Images: string[];
  Comments: Comment[];
};

// 댓글 타입
type Comment = {
  User: { nickname: string };
  content: string;
};

// 액션 타입

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
        '늙는 것도, 죽는 것도 인간이라는 덧없는 생물의 아름다움이다. <br>늙기 때문에, 죽기 때문에 견딜 수 없이 사랑스럽고 존귀한거다.',
      Images: [
        { src: 'https://picsum.photos/200/300' },
        { src: 'https://picsum.photos/200/300' },
        { src: 'https://picsum.photos/200/300' },
      ],
      Comments: [
        {
          User: {
            nickname: '태연',
          },
          content: '첫번째 댓글 테스트입니다.',
        },
        {
          User: {
            nickname: '병관',
          },
          content: '두번째 댓글 테스트입니다.',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '선양',
  },
  content: '첫 번째 게시글 #해시태그 #익스프레스',
  Images: [
    { src: 'https://picsum.photos/200/300' },
    { src: 'https://picsum.photos/200/300' },
    { src: 'https://picsum.photos/200/300' },
  ],
  Comments: [
    {
      User: {
        nickname: '태연',
      },
      content: '첫번째 댓글 테스트입니다.',
    },
    {
      User: {
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
    addPostAction(state: PostState, action: PayloadAction<Post>) {
      state.mainPosts.unshift(action.payload);
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = postSlice;
export const { addPostAction } = actions;
export default reducer;
