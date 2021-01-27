const pgp = require('pg-promise')();

const cn = {
  host     : process.env.HOST_PG,
  port     : process.env.PORT_PG,
  database : process.env.DATABASE_PG,
  user     : process.env.USER_PG,
  password : process.env.PASSWORD_PG,
};

const pgInstance = pgp(cn);

module.exports = {
  pgInstance
}