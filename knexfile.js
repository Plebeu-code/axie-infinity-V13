// Update with your config settings.

require("dotenv").config()

module.exports = {

  client: 'mysql2',
  connection: {
    host: process.env.MY2_HOST,
    user: process.env.MY2_LOGIN,
    port: process.env.MY2_PORT,
    password: process.env.MY2_PASSWORD,
    database: process.env.MY2_DB
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: "./src/database/migrations"
  }

};
