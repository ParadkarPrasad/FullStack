const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',async (req,res) => {
 const blogs = await Blog.find({})
    res.json(blogs);
  })


blogRouter.post('/', async (req,res,next)=> {
  const body = req.body

  if(!body.title || !body.url){
    return res.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
 const savedBlog = await blog.save()
 res.status(201).json(savedBlog)
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