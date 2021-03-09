import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development'; // 기본값 development 모드
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // 시퀄라이즈가 node와 mysql을 연결해줍니다. (연결정보를 담아줍니다.)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
