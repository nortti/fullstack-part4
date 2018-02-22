const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, nonExistingId, blogsInDb, userFromDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
  })

  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(n => n.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  describe('addition of a new blog', async () => {
    test('POST /api/blogs succeeds with valid data', async () => {
      const blogsBefore = await blogsInDb()
      const user = await userFromDb()
      const newBlog = {
        title: 'Blog 4',
        author: 'Author 4',
        url: 'Url 4',
        likes: 4,
        userId: user._id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length + 1)

      const titles = blogsAfter.map(r => r.title)
      expect(titles).toContain('Blog 4')
    })

    test('POST /api/blogs without likes defaults to 0', async () => {
      const user = await userFromDb()
      const newBlog = {
        title: 'Blog 5',
        author: 'Author 5',
        url: 'Url 5',
        userId: user._id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      const blog = blogsAfterOperation.find(blog => blog.title === 'Blog 5')
      expect(blog.likes).toBe(0)
    })

    test('POST /api/blogs without title or url returns 400', async () => {
      const newBlog = {
        author: 'Author 6',
        likes: 6
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deleting a blog', async () => {
    test('DELETE /api/blogs/:id removes blog from db', async () => {
      const blogsBefore = await blogsInDb()
      const deleteBlog = blogsBefore[0]

      await api
        .delete(`/api/blogs/${deleteBlog.id}`)
        .expect(200)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length - 1)
      const titles = blogsAfter.map(r => r.title)
      expect(titles).not.toContain(deleteBlog.title)
    })
  })
})

afterAll(() => {
  server.close()
})
