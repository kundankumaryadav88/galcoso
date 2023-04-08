const data = require("../../config/config.json");

const { Client } = require("pg");
const connectionString =data["connectionString"]||process.env.dbstring;

const query = async (str) => {
  try {
    const client = new Client({ connectionString });

    client.connect();
    let result = await client.query(`${str}`);
    await client.end();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const queryWithPara = async (str, arr) => {
  try {
    const client = new Client({ connectionString });
    await client.connect();
    let result = await client.query(`${str}`, arr);
    await client.end();
    console.log(result);
    return result;
  } catch (error) {
    // next(error)
    console.log(error);
  }
};
// (async()=>{
// let res=await queryWithPara(`insert into login(email,password,mobile)values($1,$2,$3)`,["raman","rewati","7250324730"]);
// console.log(res)})();

module.exports = { query, queryWithPara };
