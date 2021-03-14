import { Button, List, Avatar } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { DisconnectOutlined } from '@ant-design/icons';
import { Follow } from 'store/modules/user';
import Dialog from './Dialog';
import CloseButton from './CloseButton';
import useUser from 'store/modules/userHook';

// Types
type FollowListProps = {
  header: string;
  data: Follow[];
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

const LoadMoreList = styled(List)`
  position: relative;
  .anticon-close-circle {
    position: absolute;
    top: 0;
    right: 0;
  }
  ul {
    max-height: 400px;
    overflow-y: auto;
  }
`;

// export
function FollowList({ header, data }: FollowListProps) {
  const [loadMore, setLoadMore] = useState(false);
  const { unFollow, removeFollower } = useUser();

  // 더보기 버튼 팝업
  const onOpen = useCallback(() => {
    setLoadMore(true);
  }, [setLoadMore]);
  const onClose = useCallback(() => {
    setLoadMore(false);
  }, [setLoadMore]);

  // 팔로워, 팔로잉 제거 버튼
  const onRemove = useCallback((id: number) => {
    if (header === '팔로워 목록') {
      removeFollower(id);
    } else {
      unFollow(id);
    }
  }, []);

  return (
    <>
      <StyledList
        header={<h3>{header}</h3>}
        loadMore={
          <LoadMore>
            <Button onClick={onOpen}>더 보기</Button>
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
                item.avatar ? (
                  <Avatar src={item.avatar} />
                ) : (
                  <Avatar>{item.nickname && item.nickname.charAt(0)}</Avatar>
                )
              }
              title={item.nickname}
            />
          </ListItem>
        )}
      />
      {loadMore && (
        <Dialog onClose={onClose}>
          <div onClick={e => e.stopPropagation()}>
            <LoadMoreList
              header={
                <>
                  <h3>{header}</h3>
                  <CloseButton onClose={onClose} />
                </>
              }
              dataSource={data}
              renderItem={(item: Follow) => (
                <ListItem actions={[<DisconnectOutlined key="unfollow" />]}>
                  <ListItem.Meta
                    avatar={
                      item.avatar ? (
                        <Avatar src={item.avatar} />
                      ) : (
                        <Avatar>
                          {item.nickname && item.nickname.charAt(0)}
                        </Avatar>
                      )
                    }
                    title={item.nickname}
                  />
                </ListItem>
              )}
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default FollowList;
