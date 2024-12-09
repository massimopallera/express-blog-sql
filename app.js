import express from 'express'
import cors from 'cors'
import chalk from 'chalk'

// 📌 middlewares
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js'

// 📌 routes
import postsRouter from './routes/posts.js'


const HOST = process.env.HOST || "http://127.0.0.1"
const PORT = process.env.PORT || 3000 || 3001


const app = express()
app.use(express.json())
app.use(cors())


//Create a Server Error to test Server Error Handling
// app.use((req, res, next) => {
//   throw new Error('Throwing Manual Error')
// })
  
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server listening on ${HOST}:${PORT}`));
})

// Home Page
// app.use('/', (req,res) => {
//   res.send('Welcome to Express Blog API')
// })

app.use('/posts', logger)
app.use('/posts', postsRouter)

app.use(notFound)

//Server Errors Handler (5xx) -- DO NOT WRITE AFTER THIS FUNCTION
app.use((err,req,res,next) => {
  console.error(err.message);
  res.status(500).send('Something went wrong! 500 Internal Server Error');
})