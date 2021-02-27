import { Button, Card, List, Avatar } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { DisconnectOutlined } from '@ant-design/icons';

// Types
type FollowListProps = {
  header: string;
  data: any[];
};

// styled components
const StyledList = styled(List)`
  flex: 1 1 50%;
  padding: 0 10px;

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    flex: 1 1 100%;
  }
`;

const LoadMore = styled.div`
  text-align: center;
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
      renderItem={item => (
        <ListItem actions={[<DisconnectOutlined key="stop" />]}>
          <ListItem.Meta avatar={<Avatar>선양</Avatar>} title={item.name} />
        </ListItem>
      )}
    />
  );
}

export default FollowList;
