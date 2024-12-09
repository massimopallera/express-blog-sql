import mysql from 'mysql2'
import dotenv from 'dotenv'
import chalk from 'chalk'

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost' ,
    user: dotenv.config().parsed.DB_USER || 'user', //Made with AI
    password: dotenv.config().parsed.DB_PASSWORD || '' , //Made with AI
    database: process.env.DB_DATABASE || 'blog',
    port: process.env.DB_PORT || 3306
})

connection.connect(err => {
    if (err) throw err
    console.log(chalk.greenBright('Connected to Database'));
})

export default  connection