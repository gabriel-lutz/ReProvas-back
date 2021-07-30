require('dotenv').config();
//import "./src/setup"


module.exports = {
  type: "postgres",
  url: process.env.DB_URL,
  migrationsTableName: "migrations",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js"
  }
};