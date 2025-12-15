import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog)
    console.log(returnedBlog)
    updateBlog(returnedBlog)
  }

  const updateBlog = async (updatedBlog) => {
    await dispatch(likeBlog(updatedBlog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog.id))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <div className="blog" style={blogStyle}>
        <div key={blog.id}>
          <div>
            {blog.title} {blog.author}{' '}
            <button onClick={toggleVisibility}>
              {visible ? 'hide' : 'view'}
            </button>
          </div>
          {visible && (
            <div>
              <p>url: {blog.url}</p>
              <p>
                likes: {blog.likes} <button onClick={handleLike}>like</button>
              </p>
              <p>{blog.user.name}</p>
              {!!(
                blog.user &&
                user &&
                blog.user.username === user.username
              ) && (
                <button className="delete" onClick={() => handleDelete(blog)}>
                  delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
