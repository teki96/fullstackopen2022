import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogForm = ({ toggleVisibility, user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createBlog(newBlog, user))
    } catch (error) {
      console.error('Error adding blog:', error)
    } finally {
      setNewBlog({ title: '', author: '', url: '' })
      toggleVisibility()
    }
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
