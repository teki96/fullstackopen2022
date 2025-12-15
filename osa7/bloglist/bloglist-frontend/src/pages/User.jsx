import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  const navigate = useNavigate()

  const navigateToBlog = (id) => {
    navigate(`/blogs/${id}`)
  }

  if (!user) {
    return null
  }

  const userBlogs = blogs.filter((blog) => blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id} onClick={() => navigateToBlog(blog.id)}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
