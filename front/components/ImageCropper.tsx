import { Button } from 'antd';
import { dataURLtoFile } from 'lib/convertFile';
import { getCroppedImg } from 'lib/easyCrop';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

// Types
type ImageCropperProps = {
  inputImg: any;
  setInputImg: React.Dispatch<any>;
  inputImgName: string;
  setInputImgName: React.Dispatch<any>;
  setCroppedFile: React.Dispatch<any>;
};

// styled components
const CropperBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  > div {
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
`;

// export
const ImageCropper = ({
  inputImg,
  setInputImg,
  inputImgName,
  setInputImgName,
  setCroppedFile,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // onCropComplete() 사용자가 자른 영역을 수정할 때마다 발생합니다.
  // 이상적이진 않군 더 나은 구현은 블롭을 얻는 것입니다.
  // 사용자가 제출 단추를 눌렀을 때만 해당되지만 지금은 이 기능이 작동합니다.
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 사진 업로드 버튼을 눌렀을때 실행됩니다.
  const onCropUpload = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        inputImg,
        croppedAreaPixels
      );
      const croppedFile = dataURLtoFile(croppedImage, inputImgName);
      setCroppedFile(croppedFile);
      setInputImg(null);
      setInputImgName(null);
    } catch (e) {
      console.error(e);
    }
  }, [inputImg, croppedAreaPixels]);

  return (
    // '직위: 친척'을 가진 부모를 가질 필요가 있다.
    // 크롭이 전체 페이지를 차지하지 않도록
    <CropperBox>
      <div>
        <Cropper
          image={inputImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <Button size="large" onClick={onCropUpload}>
        사진 업로드
      </Button>
    </CropperBox>
  );
};

export default ImageCropper;
