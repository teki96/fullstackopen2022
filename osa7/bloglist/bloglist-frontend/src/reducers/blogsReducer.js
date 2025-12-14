import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create({ ...content, likes: 0 })
    dispatch(addBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (updatedBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogsService.updateBlog(
      updatedBlog.id,
      updatedBlog
    )
    dispatch(addLike(returnedBlog))
  }
}

const sortBlogs = (blogs) => {
  return blogs.slice().sort((a, b) => b.likes - a.likes)
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(sortBlogs(blogs)))
  }
}

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    setBlogs: (_state, action) => {
      return action.payload
    },
    addLike: (state, action) => {
      const updated = action.payload
      return state.map((blog) => (blog.id === updated.id ? updated : blog))
    },
  },
})

export const { addBlog, removeBlog, setBlogs, addLike } = blogSlice.actions

export default blogSlice.reducer
