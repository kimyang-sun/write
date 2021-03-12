import React, { useCallback, useEffect, useRef, useState } from 'react';
import usePost from 'store/modules/postHook';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ImagePaths from './ImagePaths';
import CloseButton from './CloseButton';
import Dialog from './Dialog';
import { UserDataPayload } from 'store/modules/user';
import createDate from 'lib/date';
import shortId from 'shortid';
import ImageCropper from './ImageCropper';
import { readFile } from 'lib/readFile';

// Types
type PostFormProps = {
  setPostCreating: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserDataPayload;
};

type PostFormType = {
  text: string;
  image: any;
  hashtag: string;
};

// styled components
const StyledPostForm = styled(Form)`
  textarea,
  .ant-btn-block {
    font-size: 1rem;
  }
  textarea {
    resize: none;
    padding: 8px 12px;
    margin-bottom: 10px;
    min-height: 200px;
  }

  button[type='submit'] {
    margin-top: 15px;
  }

  p {
    font-size: 0.875rem;
    color: ${props => props.theme.color.gray};
    padding-top: 5px;
  }
`;

const PostFormTitle = styled.div`
  position: relative;
  text-align: center;
  padding: 10px 0;
  .anticon-close-circle {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

// export
function PostForm({ setPostCreating, user }: PostFormProps) {
  const { addPost, addPostDone } = usePost();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [inputImg, setInputImg] = useState<string | ArrayBuffer>(null);
  const [blob, setBlob] = useState(null);
  // React Hook Form 연동
  const { handleSubmit, control, register } = useForm<PostFormType>();
  const onSubmit = handleSubmit((data: PostFormType) => {
    // 이미지가 없으면 랜덤이미지를 넣습니다.
    let images: any[] = [];
    if (data.image.length === 0) {
      images = [{ src: 'https://picsum.photos/650/650' }];
    } else {
      images = data.image;
    }
    // 작성하는 현재날짜를 기록합니다.
    const date = createDate();

    addPost({
      id: shortId.generate(),
      User: {
        id: user.id,
        nickname: user.nickname,
      },
      content: data.text,
      hashtag: data.hashtag,
      Images: images,
      date: date,
      Comments: [],
    });
  });

  const onClose = useCallback(() => {
    setPostCreating(false);
  }, [setPostCreating]);

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

  // addPostDone 게시글 작성이 완료되면 창을 닫아줍니다.
  // 그냥 onSubmit에서 하게되면 만약 서버에 문제가 있거나 하면 작동이 안됐는데 창이 닫힐수가 있습니다.
  useEffect(() => {
    if (addPostDone) setPostCreating(false);
  }, [addPostDone]);

  return (
    <Dialog onClose={onClose}>
      <StyledPostForm
        encType="multipart/form-data"
        onFinish={onSubmit}
        onClick={e => e.stopPropagation()}
      >
        <PostFormTitle>
          글 작성하기
          <CloseButton onClose={onClose} />
        </PostFormTitle>
        <Controller
          as={<Input.TextArea />}
          name="text"
          control={control}
          maxLength={140}
          placeholder="당신의 마음을 적어보세요."
          defaultValue=""
        />
        <input
          type="file"
          name="image"
          ref={e => {
            register(e);
            imageInputRef.current = e;
          }}
          accept="image/*"
          multiple
          hidden
          onChange={onFileChange}
        />
        {inputImg && (
          <ImageCropper
            inputImg={inputImg}
            setInputImg={setInputImg}
            setBlob={setBlob}
          />
        )}
        <Button onClick={onClickImageUpload}>사진 업로드</Button>
        <p>사진을 첨부하지 않으면 랜덤이미지가 등록됩니다.</p>
        <ImagePaths />
        <Controller
          as={<Input />}
          type="text"
          name="hashtag"
          control={control}
          placeholder="해시태그 추가 ex) #쓰다 #마음"
          defaultValue=""
        />
        <Button htmlType="submit" size="large" block>
          게시하기
        </Button>
      </StyledPostForm>
    </Dialog>
  );
}

export default PostForm;
