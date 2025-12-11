import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

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
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "success",
      })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
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
      setNotification({ message: `Welcome ${user.name}`, type: "success" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (exception) {
      setNotification({ message: "wrong username or password", type: "error" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setNotification({
          message: `Blog ${blog.title} by ${blog.author} removed`,
          type: "success",
        })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      } catch (exception) {
        setNotification({ message: "error removing blog", type: "error" })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    blogService.setToken(null)
    setNotification({ message: "Logged out successfully", type: "success" })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
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
      <Notification message={notification.message} type={notification.type} />

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
