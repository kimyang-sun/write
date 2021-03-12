import React, { useEffect, useState } from 'react';
import usePost from 'store/modules/postHook';
import useUser from 'store/modules/userHook';
import { Button } from 'antd';
import PageTitle from 'components/PageTitle';
import PostForm from 'components/PostForm';
import PostCard from 'components/PostCard';
import { generateDummyPost, Post } from 'store/modules/post';
import styled from 'styled-components';

// styled components
const SubTitle = styled.div`
  border: 1px solid #ddd;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Home() {
  const { userData, loadMyInfo } = useUser();
  const { mainPosts, loadPosts, loadPostsLoading, hasMorePosts } = usePost();
  const [postCreating, setPostCreating] = useState(false);

  // 초기 렌더링시 게시물을 불러옵니다
  useEffect(() => {
    loadMyInfo();
    loadPosts(generateDummyPost(5));
  }, []);

  //스크롤시 게시물을 더 불러옵니다.
  useEffect(() => {
    function onScroll() {
      // 스크롤이 가장 밑이면 게시글을 더 불러옵니다.
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) loadPosts(generateDummyPost(5));
      }
    }
    window.addEventListener('scroll', onScroll);

    // unmount될때 스크롤 이벤트를 취소해줘야 합니다. (메모리에 쌓이게 됨)
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts]);

  return (
    <>
      <PageTitle title="최신 글" />
      {userData ? (
        <SubTitle>
          <p>지금 바로 마음을 적어보세요.</p>{' '}
          <Button onClick={() => setPostCreating(true)}>글 작성하기</Button>
        </SubTitle>
      ) : (
        <SubTitle>로그인을 하시면 글을 작성하실 수 있습니다.</SubTitle>
      )}
      {mainPosts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {postCreating && (
        <PostForm user={userData} setPostCreating={setPostCreating} />
      )}
    </>
  );
}

export default Home;
