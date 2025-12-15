import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useRef } from 'react'
import Blog from '../components/Blog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const toggleFormVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      {user && (
        <>
          <h2>Blogs</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm toggleVisibility={toggleFormVisibility} user={user} />
          </Togglable>
          <div>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Blogs
