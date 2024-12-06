const posts = require('../db/posts.js') // database
const fs = require('fs') //to manipulate system files
const connection = require('../db/connection.js')

const index = (req,res) => {

  const sql = `SELECT * FROM posts` //Select all from posts

  connection.query(sql,(err, results) =>{
    if(err) return res.status(500).json({ Error: err }) //if there is an error it would return the error
    res.status(200).json({data: results}) // return data
  })
}


const show = (req,res) => {

  //get params
  const id = req.params.id
  //make query
  const query = `SELECT * FROM posts WHERE ID = ?`
  //send query
  connection.query(query, [id], (err, results) =>{

    if(err) return res.status(500).json({Error: err})
    //control if element exists. If elements doesn't exist, return 404
    if(!results[0]) return res.status(404).json({results : "404 Not Found"})
    //return element
    res.status(200).json({result : results})

  })

}

const printByTag = (req, res) => {
  const tag = req.params.tag

  //filters posts with that specific tag
  const postsWTag = posts.filter( element => element.tags.includes(tag))

  // res.send(postsWTag)

  res.status(200).json({
    tag,
    posts: postsWTag
  })
}

const store =(req,res) => {
  const toStore = {
    ...req.body
  }

  //push in posts
  posts.push(toStore) 
  
  //rewrite and update the "database"
  fs.writeFileSync('./db/posts.js',`module.exports=${JSON.stringify(posts,null,2)}`)

  res.status(200).json({posts})
}

const update = (req,res) => {

  //memorise the update that client want to do
  const update = {
    ...req.body
  }  
  
  //slug from parameters of url
  const slugPar = req.params.slug.toLowerCase()

  //find the post with the slug and update it
  const toUpdate = posts.find(post => {
  
    //slug from posts key
    const slugPost = post.slug.toLowerCase()

    //if there is the slug, it will update the object
    if(slugPost === slugPar){
      posts.splice(posts.indexOf(post),1, update)
      return true
    } else {
      return false
    }
  })

  //if toUpdate is empty or false, it will be returned a 404
  if(!toUpdate){
    return res.status(404).send("Error: 404 Not Found")
  }

  //rewrtie the "database" and update it
  fs.writeFileSync('./db/posts.js', `module.exports=${JSON.stringify(posts,null,2)}`)

  // return to client the new Object
  return res.status(200).json({
    "New Posts": posts
  })
  
}


const destroy = (req, res) => {

  //get params
  const id = req.params.id
  //create query with placeholder
  const query = `DELETE FROM posts WHERE id = ?`
  //send query
  connection.query(query, [id], (err, results) => {
    //control if there is the element. If there is not the element, return 404
    if(err) return res.json({Error: err})
    if(results.affectedRows === 0) return res.status(404).json({Error: "404 Not Found"})
      //return status(204) and an empty response  
      res.status(204).json("Element removed")
  })

}

module.exports ={
  index, 
  show,
  printByTag,
  store,
  update,
  destroy
}