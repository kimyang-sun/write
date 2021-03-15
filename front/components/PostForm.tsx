import React, { useCallback, useEffect, useRef, useState } from 'react';
import usePost from 'store/modules/postHook';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ImagePreview from './ImagePreview';
import CloseButton from './CloseButton';
import Dialog from './Dialog';
import ImageCropper from './ImageCropper';
import { readFile } from 'lib/convertFile';

// Types
type PostFormProps = {
  setPostCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

type PostFormType = {
  text: string;
  image: any;
  tagText: string;
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
function PostForm({ setPostCreating }: PostFormProps) {
  const { addPost, addPostDone, uploadPostImage, imagePaths } = usePost();
  const imageInputRef = useRef(null);
  const [inputImg, setInputImg] = useState(null);
  const [inputImgName, setInputImgName] = useState<string>(null);
  const [CroppedFile, setCroppedFile] = useState(null);
  // React Hook Form 연동
  const { handleSubmit, control } = useForm<PostFormType>();
  const onSubmit = handleSubmit((data: PostFormType) => {
    // 닉네임은 필수여서 비워두면 안됩니다.
    if (!data.text || !data.text.trim()) {
      return alert('게시글의 내용을 입력해주세요. (공백 불가능)');
    }
    const image = imagePaths.length > 0 ? imagePaths : null;
    addPost({
      image,
      content: data.text,
      tag: data.tagText,
    });
  });

  // 이미지를 Crop한 후 생기는 CroppedFile
  useEffect(() => {
    if (CroppedFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', CroppedFile);

      // 이미지 업로드
      uploadPostImage(imageFormData);
    }
  }, [CroppedFile]);

  const onClose = useCallback(() => {
    setPostCreating(false);
  }, [setPostCreating]);

  // 사진 업로드 클릭
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current && imageInputRef.current.click();
  }, []);

  // 사진 업로드
  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      // 이미지 파일을 base64 URL로 변환 및 이미지 이름 저장
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        let imageDataUrl: any = await readFile(file);
        setInputImg(imageDataUrl);
        setInputImgName(file.name);
      }
    },
    []
  );

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
          ref={imageInputRef}
          accept="image/*"
          hidden
          onChange={onFileChange}
        />
        {inputImg && (
          <ImageCropper
            inputImg={inputImg}
            setInputImg={setInputImg}
            inputImgName={inputImgName}
            setInputImgName={setInputImgName}
            setCroppedFile={setCroppedFile}
          />
        )}
        <Button onClick={onClickImageUpload}>사진 업로드</Button>
        <p>사진을 첨부하지 않으면 랜덤이미지가 출력됩니다.</p>
        <ImagePreview imageInputRef={imageInputRef} />
        <Controller
          as={<Input />}
          type="text"
          name="tagText"
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
