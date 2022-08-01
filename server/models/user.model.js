export const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    lastOnline: {
      type: Sequelize.DATE,
      default: new Date(),
    },
    totalTime: {
      type: Sequelize.INTEGER,
    },
    totalProgress: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.BLOB,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    gold: {
      type: Sequelize.STRING,
      default: '',
    },
    experiense: {
      type: Sequelize.STRING,
      default: '',
    },
    createdAt: {
      type: Sequelize.DATE,
      default: new Date(),
    },
  });
  return User;
};