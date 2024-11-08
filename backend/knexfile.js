require('dotenv').config();

console.log(process.env.NODE_ENV);

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_USER || 'user',
      database: process.env.DB_NAME || 'my_typing_dojo',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, // Renderの環境変数を利用
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
