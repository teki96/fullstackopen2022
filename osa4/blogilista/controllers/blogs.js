const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
   Blog.find({}).then(blogs => {
      response.json(blogs)
    })
  })

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
  
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing'})
  }
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter