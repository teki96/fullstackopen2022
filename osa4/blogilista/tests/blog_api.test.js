const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let token

describe('when there is initially some blogs saved', () => {
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    //lisätään testikäyttäjä ja blogit käyttäjälle
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const userForToken = { username: savedUser.username, id: savedUser._id }
    token = jwt.sign(userForToken, process.env.SECRET)

    const userWithBlogs = helper.initialBlogs.map(blog => { return { ...blog, user: savedUser._id } })

    await Blog.insertMany(userWithBlogs)
  })

    test('blogs are returned as json', async () => {
        const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    })

    test('blogs have id field', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)

        response.body.forEach(blog => {
          assert(blog.id)
        })
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)

        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

        const contents = response.body.map(r => r.title)
        assert(contents.includes('First class tests'))
    })

    test('if blog has no likes, it defaults to 0', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)

        const addedBlog = response.body.find(blog => blog.title === 'First class tests')

        assert.strictEqual(addedBlog.likes, 0)
    })

    test('if blog has no title or url field, return 400', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            likes: 10,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('deletion of a blog', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const contents = blogsAtEnd.map(r => r.title)
        assert(!contents.includes(blogToDelete.title))
    })

    test('updating a blog', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToUpdate = blogAtStart[0]

        const updatedBlog = {
            likes: 123
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

        assert.strictEqual(updatedBlogInDb.likes, 123)
    })

    test('if blog is created with no valid token, return 401', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'Bearer invalid_token')
            .expect(401)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

after(async () => {
    await mongoose.connection.close()
  })
})
