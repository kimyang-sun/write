export default (sequelize, DataTypes) => {
  // MySQL에는 users 테이블로 생성됩니다.
  const Post = sequelize.define(
    'Post',
    {
      // id가 기본적으로 들어있어 따로 안넣어줘도 됩니다.
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    { charset: 'utf8mb4', collate: 'utf8_general_ci' } // 한글적용 이모티콘 저장을 위해 mb4를 붙혀줍니다.
  );
  Post.associate = db => {};
  return User;
};
