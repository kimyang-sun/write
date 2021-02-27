import { Button } from 'antd';
import PageTitle from 'components/PageTitle';
import PostForm from 'components/PostForm';
import PostCard from 'components/PostCard';
import React, { useState } from 'react';
import { Post } from 'store/modules/post';
import usePost from 'store/modules/postHook';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';

const SubTitle = styled.div`
  border: 1px solid #ddd;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Home() {
  const { isLoggedIn } = useUser();
  const { mainPosts } = usePost();
  const [postCreating, setPostCreating] = useState(true);

  return (
    <>
      <PageTitle title="최신 글" />
      {isLoggedIn ? (
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
      {postCreating && <PostForm setPostCreating={setPostCreating} />}
    </>
  );
}

export default Home;
