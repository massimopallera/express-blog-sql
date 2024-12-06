const posts = require('../db/posts.js') // database
const fs = require('fs') //to manipulate system files

const index = (req,res) => {
  res.status(200).json({
    data: posts,
    counter: posts.length
  })
}

const show = (req, res) => {
  const post = posts.find(post => post.slug.toLowerCase() === req.params.slug.toLowerCase())
  
  let prev, next = undefined

  if (posts.indexOf(post) > 0) {
    prev = posts[posts.indexOf(post)-1].slug
  }
  if (posts.indexOf(post) < posts.length-1) {
    next = posts[posts.indexOf(post)+1].slug
  }

  res.status(200).json({
    next,
    prev,
    data:post
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

const destroy = (req,res) => {
  const slug = req.params.slug.toLowerCase()

  const post = posts.find(post => post.slug.toLowerCase() === slug)

  if(!post){
    return res.status(404).send("Error: 404 Not Found")
  }

  //using filter create another array, meanwhile with splice we just remove the element from the original array
  //const newPosts = posts.filter(post => post.slug.toLowerCase()!== slug)
  posts.splice(posts.indexOf(post),1)

  fs.writeFileSync('./db/posts.js', `module.exports=${JSON.stringify(posts,null,2)}`)

  res.status(200).json({
    "status" : "200 OK",
    "data" : posts,
    "count": posts.length
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