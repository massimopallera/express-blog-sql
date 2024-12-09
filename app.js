import express from 'express'
import cors from 'cors'

const app = express()
const HOST = process.env.HOST || "http://127.0.0.1"
const PORT = process.env.PORT || 3000 || 3001

// 📌 middlewares
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js'

// 📌 routes
import postsRouter from './routes/posts.js'

app.use(express.json())
app.use(cors())


//Create a Server Error to test Server Error Handling
// app.use((req, res, next) => {
//   throw new Error('Try Server Error Handling')
// })
  
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
})

// Home Page
// app.use('/', (req,res) => {
//   res.send('Welcome to Express Blog API')
// })

app.use('/posts', logger)
app.use('/posts', postsRouter)

//tags and categories
/* app.get('/tags', (req, res) => { 
  res.status(200).json({
    tags
  })
})
app.get('/categories', (req, res) => { 
  res.status(200).json({
    categories
  })
}) */

app.use(notFound)

//Server Errors Handler (5xx) -- DO NOT WRITE AFTER THIS FUNCTION
app.use((err,req,res,next) => {
  console.error(err.message);
  res.status(500).send('Something went wrong! 500 Internal Server Error');
})