import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logIn } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './pages/Users'
import User from './pages/User'
import BlogDetails from './pages/BlogDetails'
import Blogs from './pages/Blogs'
import Navbar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logIn(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, user])

  return (
    <div>
      <Navbar user={user} />
      <Notification />
      {!user && <LoginForm />}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
