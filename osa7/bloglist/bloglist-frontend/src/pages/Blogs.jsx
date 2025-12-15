import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const navigate = useNavigate()

  const navigateToBlog = (id) => {
    navigate(`/blogs/${id}`)
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const toggleFormVisibility = () => {
    blogFormRef.current.toggleVisibility()
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
      <h2>Blogs</h2>
      {user && (
        <>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm toggleFormVisibility={toggleFormVisibility} user={user} />
          </Togglable>
          <div>
            {sortedBlogs.map((blog) => (
              <div
                key={blog.id}
                style={blogStyle}
                onClick={() => navigateToBlog(blog.id)}
              >
                {blog.title} {blog.author}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Blogs
