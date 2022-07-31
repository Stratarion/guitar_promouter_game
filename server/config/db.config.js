export const dbConfig = {
    HOST: "localhost",
    USER: "test",
    PASSWORD: "test",
    DB: "mysql",
    PORT: "25",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
