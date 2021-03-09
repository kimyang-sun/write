module.exports = (sequelize, DataTypes) => {
  // MySQL에는 users 테이블로 생성됩니다.
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      // id가 기본적으로 들어있어 따로 안넣어줘도 됩니다.
      content: { type: DataTypes.STRING(20), allowNull: false },
    },
    { charset: 'utf8mb4', collate: 'utf8mb4_general_ci' } // 한글적용 이모티콘 저장을 위해 mb4를 붙혀줍니다.
  );
  Hashtag.associate = db => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };
  return Hashtag;
};
