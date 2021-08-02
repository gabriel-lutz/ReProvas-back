require('dotenv').config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  migrationsRun:true,
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js"
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    }
  }
};