export default (sequelize, DataTypes) => {
  // MySQL에는 users 테이블로 생성됩니다.
  const Image = sequelize.define(
    'Image',
    {
      // id가 기본적으로 들어있어 따로 안넣어줘도 됩니다.
      src: { type: DataTypes.STRING(200), allowNull: false },
    },
    { charset: 'utf8', collate: 'utf8_general_ci' } // 한글적용.
  );
  Image.associate = db => {
    db.Image.belongsTo(db.Post);
  };
  return User;
};
