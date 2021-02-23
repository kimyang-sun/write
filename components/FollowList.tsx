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
const ListHeader = styled.h3``;

const LoadMore = styled.div``;

const ListItem = styled(List.Item)``;

// export
function FollowList({ header, data }: FollowListProps) {
  return (
    <List
      header={<ListHeader>{header}</ListHeader>}
      grid={{
        gutter: 16,
        column: 4,
        xs: 2,
        md: 3,
      }}
      loadMore={
        <LoadMore>
          <Button>더 보기</Button>
        </LoadMore>
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <ListItem>
          <Card actions={[<DisconnectOutlined key="stop" />]}>
            <Card.Meta avatar={<Avatar>선양</Avatar>} title={item.name} />
          </Card>
        </ListItem>
      )}
    />
  );
}

export default FollowList;
