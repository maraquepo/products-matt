const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connection = new Client ({
  host: "localhost",
  user: process.env.user,
  port: 5432,
  password: process.env.pass,
  database: "productsapi"
})

connection.connect(() => {
  console.log('Connection to postgreSQL DB has been established')
});

module.exports = connection;


