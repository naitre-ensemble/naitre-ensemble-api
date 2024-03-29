const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

let pool = null;

if(process.env.PORT){
  const dbProdConfig = {
    connectionString: process.env.DATABASE_URL,
  }
  pool = new Pool(dbProdConfig);
}else{
  console.log('DEVELOPEMENT MODE');
  const dbDevConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
  pool = new Pool(dbDevConfig);
}

pool.connect((err, client) => {
    if (err) {
      console.log(err);
    }
    console.log(`connection à la base de données ok...`);
});

const execQuery = async (query) => {
  return pool.query(query);
}

const execQueryWithParams = async (query, params) => {
  try{
    const res = await pool.query(query, [...params]);
    return res.rows;
  } catch(err) {
    console.log(err)
    return err;
  }
}

module.exports = {
  execQuery,
  execQueryWithParams
};
