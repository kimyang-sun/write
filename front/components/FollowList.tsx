import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Follow } from 'store/modules/user';
import useUser from 'store/modules/userHook';
import UserAvatar from './UserAvatar';
import FollowListDialog from './FollowListDialog';
import { Button, List } from 'antd';
import { DisconnectOutlined } from '@ant-design/icons';
import { trigger } from 'swr';

// Types
type FollowListProps = {
  header: string;
  data: Follow[];
  mutate: any;
};

// styled components
const StyledList = styled(List)`
  flex: 1 1 50%;
  padding: 20px 10px 0;

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    flex: 1 1 100%;
  }
`;

const LoadMore = styled.div`
  text-align: center;
  padding-top: 10px;
`;

const ListItem = styled(List.Item)`
  .ant-list-item-meta {
    align-items: center;
  }

  .anticon-disconnect {
    cursor: pointer;
    padding: 5px;
    transition: color 0.3s;
    font-size: 1.25rem;
  }

  .anticon-disconnect:hover {
    color: ${props => props.theme.color.main};
  }
`;

// export
function FollowList({ header, data, mutate }: FollowListProps) {
  const [loadMore, setLoadMore] = useState(false);
  const { unFollow, removeFollower } = useUser();
  // 팔로워, 팔로잉 제거 버튼
  const onRemove = useCallback((id: number) => {
    if (header === '팔로워') {
      removeFollower(id);
    } else {
      unFollow(id);
    }
    mutate((prev: any[]) => prev.filter(data => data.id !== id), false);
  }, []);

  // 전체보기 버튼 팝업
  const onOpen = useCallback(() => {
    setLoadMore(true);
  }, [setLoadMore]);
  const onClose = useCallback(() => {
    setLoadMore(false);
  }, [setLoadMore]);

  return (
    <>
      <StyledList
        header={<h3>{header}</h3>}
        loadMore={
          <LoadMore>
            <Button onClick={onOpen}>전체보기</Button>
          </LoadMore>
        }
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: Follow) => (
          <ListItem
            actions={[
              <DisconnectOutlined
                key="unfollow"
                onClick={() => onRemove(item.id)}
              />,
            ]}
          >
            <ListItem.Meta
              avatar={
                <UserAvatar avatar={item.avatar} nickname={item.nickname} />
              }
              title={item.nickname}
            />
          </ListItem>
        )}
      />
      {loadMore && (
        <FollowListDialog
          header={header}
          onClose={onClose}
          onRemove={onRemove}
          ListItem={ListItem}
        />
      )}
    </>
  );
}

export default FollowList;
