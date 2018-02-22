const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title && !blog.url) response.sendStatus(400)

  if (!blog.likes) blog.likes = 0

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne(request.params.id)
  response.sendStatus(200)
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes })
  response.sendStatus(200)
})

module.exports = blogsRouter
