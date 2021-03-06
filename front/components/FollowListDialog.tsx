import React, { useRef } from 'react';
import Dialog from './Dialog';
import CloseButton from './CloseButton';
import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import axios from 'axios';
import useSWR from 'swr';
import { Follow } from 'store/modules/user';
import List from 'antd/lib/list';
import { LoadingOutlined, DisconnectOutlined } from '@ant-design/icons';

// Types
type FollowListDialogProps = {
  header: string;
  onClose: () => void;
  onRemove: (id: number) => void;
  ListItem: any;
};

// styled components
const LoadMoreList = styled(List)`
  position: relative;
  .anticon-close-circle {
    position: absolute;
    top: 0;
    right: 0;
  }
  h3 {
    display: inline-block;
    padding-right: 10px;
  }
  ul {
    max-height: 400px;
    overflow-y: auto;
  }
`;

// SWR Fetcher
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then(result => result.data);

function FollowListDialog({
  header,
  onClose,
  onRemove,
  ListItem,
}: FollowListDialogProps) {
  const headerRef = useRef(header === '팔로워' ? 'Followers' : 'Followings');
  const { data: followData, error: followError, mutate: mutateFollow } = useSWR(
    `http://localhost:3006/user/${headerRef.current}`,
    fetcher
  );
  if (followError) {
    console.error(followError);
    return null; // 리턴은 Hooks보다 위에 있으면 안됩니다.
  }
  return (
    <Dialog onClose={onClose}>
      <div onClick={e => e.stopPropagation()}>
        {followData ? (
          <LoadMoreList
            header={
              <>
                <h3>{header}</h3>
                <span>{followData.length}명</span>
                <CloseButton onClose={onClose} />
              </>
            }
            dataSource={followData}
            renderItem={(item: Follow) => (
              <ListItem
                actions={[
                  <DisconnectOutlined
                    key="unfollow"
                    onClick={() => {
                      onRemove(item.id);
                      mutateFollow(
                        (prev: any[]) =>
                          prev.filter(data => data.id !== item.id),
                        false
                      );
                    }}
                  />,
                ]}
              >
                <ListItem.Meta
                  avatar={
                    <UserAvatar
                      avatar={item.avatar}
                      nickname={item.nickname}
                      id={item.id}
                    />
                  }
                  title={item.nickname}
                />
              </ListItem>
            )}
          />
        ) : (
          <LoadingOutlined style={{ display: 'block' }} />
        )}
      </div>
    </Dialog>
  );
}

export default FollowListDialog;
