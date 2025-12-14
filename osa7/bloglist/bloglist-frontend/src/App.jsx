import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
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

  const updateBlog = async (updatedBlog) => {
    try {
      await dispatch(likeBlog(updatedBlog))
    } catch (error) {
      dispatch(showNotification("Error updating blog", 5))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(showNotification(`Welcome ${user.name}`, 5))
    } catch (exception) {
      dispatch(showNotification("wrong username or password", 5))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(showNotification(`blog ${blog.title} removed`, 5))
      } catch (error) {
        dispatch(showNotification("error deleting blog", 5))
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    blogService.setToken(null)
    dispatch(showNotification("logged out", 5))
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
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
        </div>
      )}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
