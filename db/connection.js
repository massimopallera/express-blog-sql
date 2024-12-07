const mysql = require('mysql2')
const dotenv = require('dotenv')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: dotenv.config().parsed.DB_USER, //Made with AI
    password: dotenv.config().parsed.DB_PASSWORD, //Made with AI
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

connection.connect(err => {
    if (err) throw err
    console.log('Connected to Database');
})

module.exports = connection