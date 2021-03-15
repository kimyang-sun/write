// 문자열의 src를 사용하여 이미지를 생성합니다.
const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

/**
 * @param {File} image - 이미지 파일 URL
 * @param {Object} pixelCrop - pixelCrop Object - react-easy-crop으로부터 제공받음
 */

export const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  // 캔버스 폭과 높이를 설정하면 다음 작업을 수행할 수 있습니다.
  // 원래 이미지 해상도에서 크기 조정

  // 각 치수를 2배 더 큰 치수로 설정하여 안전 영역을 확보합니다.
  canvas.width = safeArea;
  canvas.height = safeArea;

  // 캔버스 컨텍스트를 이미지의 중앙 위치로 변환
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // 캔버스 너비를 최종 원하는 자르기 크기로 설정 - 기존 컨텍스트를 지웁니다.
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // 생성된 이미지를 x,y 자르기 값에 대한 올바른 오프셋으로 붙여넣습니다.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise(resolve => {
    resolve(canvas.toDataURL());
    // canvas.toBlob(blob => {
    //   resolve(URL.createObjectURL(blob));
    // }, 'image/jpeg'); 미리보기용 toBlob
  });
};
