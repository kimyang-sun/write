import { Button, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

// Types
type ProfileInputType = {
  nickname: string;
  descriptition: string;
};

// styled components
const ProfileEditContainer = styled.div``;

// export
function ProfileEditForm() {
  const onChangeNickname = () => {
    console.log('nickname change');
  };
  const onChangeDescripttion = () => {
    console.log('descripttion change');
  };

  return (
    <ProfileEditContainer>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <Input.Search
          name="nickname"
          onSearch={onChangeNickname}
          enterButton="변경"
        />
      </div>
      <div>
        <label htmlFor="description">소개</label>
        <Input.Search
          name="descriptition"
          onSearch={onChangeDescripttion}
          enterButton="변경"
        />
      </div>
    </ProfileEditContainer>
  );
}

export default ProfileEditForm;
