const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connection = new Client ({
  host: process.env.host,
  user: process.env.user,
  port: 5432,
  password: process.env.pass,
  database: "productsapi"
})

connection.connect((err) => {
  if (err) throw err
  console.log('Connection to postgreSQL DB has been established')
});

module.exports = connection;


