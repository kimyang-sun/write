export default (sequelize, DataTypes) => {
  // MySQL에는 users 테이블로 생성됩니다.
  const User = sequelize.define(
    'User',
    {
      // id가 기본적으로 들어있어 따로 안넣어줘도 됩니다.
      // allowNull false면 필수, unique는 고유의 값 (중복 X)
      // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATATIME
      email: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      nickname: { type: DataTypes.STRING(30), allowNull: false },
      password: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.STRING(50), allowNull: true },
    },
    { charset: 'utf8', collate: 'utf8_general_ci' } // 한글적용
  );
  User.associate = db => {
    db.User.hasMany(db.Post); // 유저가 포스트를 여러개 가질 수 있다.
  };
  return User;
};
