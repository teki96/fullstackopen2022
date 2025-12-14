import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import { initializeBlogs, createBlog } from "./reducers/blogsReducer"
import { initializeUsers } from "./reducers/usersReducer"
import { Routes, Route } from "react-router-dom"
import Users from "./pages/Users"
import User from "./pages/User"
import BlogDetails from "./pages/BlogDetails"
import { logoutUser, logIn } from "./reducers/loginReducer"
import Blogs from "./pages/Blogs"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await dispatch(createBlog(blogObject, user))
      dispatch(
        showNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5
        )
      )
    } catch (error) {
      dispatch(showNotification("Error adding blog", 5))
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" }
    const showWhenVisible = { display: loginVisible ? "" : "none" }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    console.log("User logged out")
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {!user && loginForm()}
      {user && (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{user.name} logged in</p>
            <button
              className="logout"
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              logout
            </button>
          </div>
        </div>
      )}
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
