const pgp = require('pg-promise')();

// const ssl = null;
const ssl = {rejectUnauthorized: false};
const cn = {
  host     : process.env.HOST_PG,
  port     : process.env.PORT_PG,
  database : process.env.DATABASE_PG,
  user     : process.env.USER_PG,
  password : process.env.PASSWORD_PG,
  ssl:ssl
};

const pgInstance = pgp(cn);
// pgp.pg.defaults.ssl = true;

module.exports = {
  pgInstance
}