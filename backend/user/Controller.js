const { queryWithPara, query } = require("../utilities/db");
const hash = require("password-hash");
const { isUserExist } = require("../user/sqlController");
const { authentication } = require("./Auth");
const data=require('../../config/config.json');
const { response } = require("../utilities/response");
const home = (req, res) => {
  res.status(200).send(JSON.stringify("its me your server")).end();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await isUserExist(email, password);
  if(user) {
    const result=await authentication(email,data['secretkey']);
    console.warn(result);
    res.status(200).send(response(result,true,"Authentication successful")).end();
  }
//   res.status(200).send(JSON.stringify("its me your server")).end();
};

const signup = async (req, res) => {
  const { email, password, mobile } = req.body;
  const isUserExist = await query(
    `select email from login where email='${email}' `
  );
  console.log(isUserExist.rowCount);
  if (isUserExist.rowCount == 0) {
    const hashPassword = hash.generate(password);

    const result = await queryWithPara(
      `insert into login(email,password,mobile)values($1,$2,$3)`,
      [email, hashPassword, mobile]
    );
    console.warn(result);
    if (result.rowCount == 1) {
      res
        .status(200)
        .send(
          JSON.stringify({
            data: [],
            success: true,
            message: "you signed successfully",
          })
        )
        .end();
    } else {
      res
        .status(400)
        .send(
          JSON.stringify({
            data: [],
            success: false,
            message: "sorry! try again later",
          })
        )
        .end();
    }
  } else {
    res
      .status(400)
      .send(
        JSON.stringify({
          data: [],
          success: false,
          message: "User already exist",
        })
      )
      .end();
  }
};

module.exports = { home, login, signup };
