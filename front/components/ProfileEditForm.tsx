import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useUser from 'store/modules/userHook';
import UserAvatar from './UserAvatar';
import { Controller, useForm } from 'react-hook-form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';

// Types
type ProfileEditFormType = {
  image: any;
  nickname: string;
  introduction: string;
};

// styled components
const StyledProfileEditForm = styled(Form)`
  margin-bottom: 15px;
  .input-box {
    margin-bottom: 15px;
    > label {
      display: block;
      padding-bottom: 5px;
    }
  }
  .image-box > button {
    vertical-align: middle;
    margin-left: 10px;
  }
`;

// export
function ProfileEditForm() {
  const {
    userData,
    avatarURL,
    changeProfile,
    changeProfileLoading,
    changeProfileDone,
    uploadUserImageLoading,
    uploadUserImage,
    removeUserImage,
  } = useUser();
  const imageInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(
    userData.avatar ? userData.avatar : null
  );

  // React Hook Form 연동
  const { handleSubmit, control } = useForm<ProfileEditFormType>();
  const onSubmit = handleSubmit((data: ProfileEditFormType) => {
    // 닉네임은 필수여서 비워두면 안됩니다.
    if (!data.nickname || !data.nickname.trim()) {
      return alert('닉네임을 입력해주세요. (공백 불가능)');
    }
    changeProfile({
      nickname: data.nickname,
      introduction: data.introduction,
      avatar: avatarURL,
    });
  });

  useEffect(() => {
    if (changeProfileDone) {
      alert('변경이 완료되었습니다');
    }
  }, [changeProfileDone]);

  useEffect(() => {
    if (avatarURL) setAvatarImage(avatarURL);
  }, [avatarURL]);

  // 사진 업로드 클릭
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current && imageInputRef.current.click();
  }, []);

  // 사진 업로드
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadUserImage(e.target.files[0]);
    }
  };

  // 사진 지우기 클릭
  const onClickImageErase = useCallback(() => {
    setAvatarImage(null);
    removeUserImage();
  }, []);

  return (
    <StyledProfileEditForm onFinish={onSubmit}>
      <div className="input-box image-box">
        <label>프로필 사진</label>
        <input
          type="file"
          name="image"
          ref={imageInputRef}
          accept="image/*"
          hidden
          onChange={onFileChange}
        />
        {
          <UserAvatar
            avatar={avatarImage}
            nickname={userData.nickname}
            id={userData.id}
            sizeUp
          />
        }
        <Button
          onClick={onClickImageUpload}
          size="small"
          loading={uploadUserImageLoading}
        >
          사진 업로드
        </Button>
        <Button onClick={onClickImageErase} size="small">
          사진 지우기
        </Button>
      </div>
      <div className="input-box">
        <label htmlFor="nickname">닉네임 (최소 2글자, 최대 12글자)</label>
        <Controller
          as={<Input />}
          name="nickname"
          minLength={2}
          maxLength={12}
          control={control}
          placeholder="닉네임을 입력해주세요."
          defaultValue={userData.nickname}
        />
      </div>
      <div className="input-box">
        <label htmlFor="introduction">소개 (최대 40글자)</label>
        <Controller
          as={<Input />}
          name="introduction"
          maxLength={40}
          control={control}
          placeholder="간단한 소개를 해주세요."
          defaultValue={userData.introduction}
        />
      </div>
      <Button htmlType="submit" type="primary" loading={changeProfileLoading}>
        변경하기
      </Button>
    </StyledProfileEditForm>
  );
}

export default ProfileEditForm;
