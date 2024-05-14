const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request =>{
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/',async (req,res) => {
 const blogs = await Blog.find({}).populate('user', {username: 1, name: 1,})
    res.json(blogs);
  })

blogRouter.post('/', async (request,response ,next)=> {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'invalid token or missing'})
  }

  const user = await User.findById(decodedToken.id)
  if(!body.title || !body.url){
    return res.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
 const savedBlog = await blog.save()
 user.blogs = user.blogs.concat(savedBlog._id)
 await user.save()
 response.status(201).json(savedBlog)
  })
  
  blogRouter.delete('/:id', async(req,res)=>{
    const blog = await Blog.findById(req.params.id)

    if(!blog){
      return res.status(404).json({ 
        error: 'blog not found',
      })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  })

  blogRouter.put('/:id', async(req,res)=>{
    const body = req.body

    const blog ={
      title: body.title,
      author:body.author,
      url: body.url,
      likes: body.likes
    }
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(updateBlog).status(204)
  })
module.exports = blogRouter