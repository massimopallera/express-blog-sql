const mysql = require('mysql2')
const dotenv = require('dotenv')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: dotenv.config().parsed.DB_USER,
    password: dotenv.config().parsed.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

connection.connect(err => {
    if (err) throw err
    console.log('Connected to Server');
})

module.exports = connection