// const posts = require('../db/posts.js') // old database
// const fs = require('fs') //to manipulate system files //With sql-db is not necessary
const connection = require('../db/connection.js')

const index = (req,res) => {

  const query = `SELECT * FROM posts` //Select all from posts

  connection.query(query,(err, results) =>{

    //if there is an error it would return the error
    if(err) return res.status(500).json({ Error: err }) 

    //return data
    res.status(200).json({data: results}) 
  })
}


const show = (req,res) => {

  //get params
  const id = req.params.id

  //make query
  //const query = `SELECT * FROM posts WHERE ID = ?` //return just posts


  //GROUP_CONCAT concatenate values from multiple rows
  //In that case, is used to group tags
  const query = `
  SELECT p.*, GROUP_CONCAT(t.label SEPARATOR ', ') AS tags 
  FROM post_tag AS pt  
  JOIN tags AS t ON pt.tag_id = t.id
  JOIN posts AS p ON pt.post_id = p.id
  WHERE p.id = ?
  GROUP BY pt.post_id
  ` 


  //send query
  connection.query(query, [id], (err, results) =>{

    if(err) return res.status(500).json({Error: err})

    //control if element exists. If elements doesn't exist, return 404
    if(!results[0]) return res.status(404).json({results : "404 Not Found"})

    //return element
    res.status(200).json({result : results})

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

    if(err) return res.json({Error: err})

    //control if there is the element. If there is not the element, return 404
    if(results.affectedRows === 0) return res.status(404).json({Error: "404 Not Found"})
    
    //return status(204) and an empty response  
    res.status(204).json("Element removed")
  })

}

module.exports ={
  index, 
  show,
  // printByTag,
  store,
  update,
  destroy
}