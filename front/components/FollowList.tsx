import { Button, List, Avatar } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { DisconnectOutlined } from '@ant-design/icons';
import { Follow } from 'store/modules/user';

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

// export
function FollowList({ header, data }: FollowListProps) {
  return (
    <StyledList
      header={<h3>{header}</h3>}
      loadMore={
        <LoadMore>
          <Button>더 보기</Button>
        </LoadMore>
      }
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item: Follow) => (
        <ListItem actions={[<DisconnectOutlined key="unfollow" />]}>
          <ListItem.Meta
            avatar={<Avatar>{item.nickname.charAt(0)}</Avatar>}
            title={item.nickname}
          />
        </ListItem>
      )}
    />
  );
}

export default FollowList;
