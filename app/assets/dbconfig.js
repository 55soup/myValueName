require("dotenv").config();

module.exports = {
  user: process.env.ORACLEDB_USER,
  password: process.env.ORACLEDB_PASSWORD,
  connectString: process.env.ORACLEDB_CONNECTIONSTRING,
};