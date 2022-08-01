export const dbConfig = {
    HOST: "localhost",
    USER: "test",
    PASSWORD: "test",
    DB: "test",
    PORT: "25",
    dialect: "mysql",
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
