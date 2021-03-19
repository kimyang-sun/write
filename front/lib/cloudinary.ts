// 게시글 사진 업로드
export class PostImageUploader {
  async upload(file: any) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'write-post');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/kimsunyang/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    return await res.json();
  }
}

// 유저 프로필 사진 업로드
export class UserImageUploader {
  async upload(file: any) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'write-avatar');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/kimsunyang/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    return await res.json();
  }
}
