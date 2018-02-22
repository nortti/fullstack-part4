const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: 1
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'Url 2',
    likes: 2
  },
  {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'Url 3',
    likes: 3
  }
]

const nonExistingId = async () => {
  const note = new Blog()
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

const userFromDb = async () => {
  const user = new User()
  await user.save()
  return user
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, userFromDb
}
