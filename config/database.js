const { createPool } = require("mysql2");
// db connection with mySql
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogs",
});
module.exports = pool;
