const { query } = require("../utilities/db");
const hash = require("password-hash");

const isUserExist = async (email, password) => {
  const sql = `select email,password from login where email='${email}'`;
  const result = await query(sql);
  if (result.rowCount == 1) {
    const hashPassword = result.rows[0].password;
    return hash.verify(password, hashPassword);
  }

  return false;
};

module.exports = { isUserExist };
