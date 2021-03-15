import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserDataPayload, ProfilePayload } from 'store/modules/user';
import styled from 'styled-components';
import { Input, Button, Form, Avatar } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { readFile } from 'lib/convertFile';

// Types
type ProfileEditFormProps = {
  user: UserDataPayload;
  onChangeProfile: (data: ProfilePayload) => void;
  profileLoading: boolean;
};

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
function ProfileEditForm({
  user,
  onChangeProfile,
  profileLoading,
}: ProfileEditFormProps) {
  const imageInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(
    user.avatar ? user.avatar : null
  );

  // React Hook Form 연동
  const { handleSubmit, control, errors } = useForm<ProfileEditFormType>();
  const onSubmit = handleSubmit((data: ProfileEditFormType) => {
    onChangeProfile({
      nickname: data.nickname,
      introduction: data.introduction,
      avatar: null,
    });
  });

  // 닉네임을 비워두면 에러가 알려줍니다.
  useEffect(() => {
    if (errors.nickname) alert('닉네임을 입력해주세요.');
  }, [errors.nickname]);

  // 사진 업로드 클릭
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current && imageInputRef.current.click();
  }, []);

  // 사진 업로드
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFormData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: any = await readFile(file);
      setAvatarImage(imageDataUrl);
      imageFormData.append('image', file);
    }
  };

  // 사진 지우기 클릭
  const onClickImageErase = useCallback(() => {
    setAvatarImage(null);
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
        {avatarImage ? (
          <Avatar src={avatarImage} />
        ) : (
          <Avatar>{user.nickname.charAt(0)}</Avatar>
        )}

        <Button onClick={onClickImageUpload} size="small">
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
          defaultValue={user.nickname}
          rules={{ required: true }}
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
          defaultValue={user.introduction}
        />
      </div>
      <Button htmlType="submit" type="primary" loading={profileLoading}>
        변경하기
      </Button>
    </StyledProfileEditForm>
  );
}

export default ProfileEditForm;
