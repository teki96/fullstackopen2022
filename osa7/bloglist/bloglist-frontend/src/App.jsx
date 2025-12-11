import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useDispatch } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
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
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      if (!returnedBlog.user || !returnedBlog.user.username) {
        returnedBlog.user = {
          id: user.id,
          name: user.name,
          username: user.username,
        }
      }

      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        showNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          5
        )
      )
    })
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
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
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(showNotification(`blog ${blog.title} removed`, 5))
      } catch (exception) {
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

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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
