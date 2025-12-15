import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import BlogComment from '../components/BlogComment'

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog)
    updateBlog(returnedBlog)
  }

  const updateBlog = async (updatedBlog) => {
    await dispatch(likeBlog(updatedBlog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog.id))
    }
    navigate('/')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes: {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username && (
        <button className="delete" onClick={() => handleDelete(blog)}>
          delete
        </button>
      )}
      <BlogComment blog={blog} />
    </div>
  )
}

export default BlogDetails
