import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={newBlog.url}
              name="Url"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
