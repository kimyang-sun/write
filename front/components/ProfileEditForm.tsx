import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserDataPayload } from 'store/modules/user';
import styled from 'styled-components';
import { Input, Button, Form, Avatar } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import ImageCropper from './ImageCropper';
import { readFile } from 'lib/readFile';

// Types
type ProfileEditFormProps = {
  user: UserDataPayload;
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
function ProfileEditForm({ user }: ProfileEditFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [inputImg, setInputImg] = useState<string | ArrayBuffer>(null);
  const [blob, setBlob] = useState(null);
  const [avatarImage, setAvatarImage] = useState(
    user.avatar ? user.avatar : null
  );

  // React Hook Form 연동
  const {
    handleSubmit,
    control,
    register,
    errors,
  } = useForm<ProfileEditFormType>();
  const onSubmit = handleSubmit((data: ProfileEditFormType) => {
    console.log(data);
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
    // 이미지 파일을 문자열로 변환
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: any = await readFile(file);
      setInputImg(imageDataUrl);
    }
  };

  // 사진 업로드 버튼을 누른 후에 실행되는 콜백함수 (아바타 미리보기 변경)
  useEffect(() => {
    if (blob) {
      setAvatarImage(blob);
    }
  }, [blob]);

  // 사진 지우기 클릭
  const onClickImageErase = useCallback(() => {
    setBlob(null);
    setAvatarImage(null);
  }, []);

  return (
    <StyledProfileEditForm onFinish={onSubmit}>
      <div className="input-box image-box">
        <label>프로필 사진</label>
        <input
          type="file"
          name="image"
          ref={e => {
            register(e);
            imageInputRef.current = e;
          }}
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
      {inputImg && (
        <ImageCropper
          inputImg={inputImg}
          setInputImg={setInputImg}
          setBlob={setBlob}
        />
      )}
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
      <Button htmlType="submit" type="primary">
        변경하기
      </Button>
    </StyledProfileEditForm>
  );
}

export default ProfileEditForm;
