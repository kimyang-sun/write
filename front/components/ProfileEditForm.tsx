import { Button, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

// Types
type ProfileInputType = {
  nickname: string;
  introduction: string;
};

// styled components
const ProfileEditContainer = styled.div``;

// export
function ProfileEditForm() {
  const onChangeNickname = () => {
    console.log('nickname change');
  };
  const onChangeDescripttion = () => {
    console.log('bio change');
  };

  return (
    <ProfileEditContainer>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <Input.Search
          name="nickname"
          onSearch={onChangeNickname}
          maxLength={15}
          enterButton="변경"
        />
      </div>
      <div>
        <label htmlFor="introduction">소개</label>
        <Input.Search
          name="introduction"
          onSearch={onChangeDescripttion}
          maxLength={40}
          enterButton="변경"
        />
      </div>
    </ProfileEditContainer>
  );
}

export default ProfileEditForm;
