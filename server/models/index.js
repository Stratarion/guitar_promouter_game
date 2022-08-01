import { dbConfig } from "../config/db.config.js";
import { Sequelize } from "sequelize";
import { TutorialModel } from "./tutorial.model.js";
import { PostModel } from "./post.model.js";
import { UserModel } from "./user.model.js";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = TutorialModel(sequelize, Sequelize);
db.posts = PostModel(sequelize, Sequelize);
db.user = UserModel(sequelize, Sequelize);
export default db;
