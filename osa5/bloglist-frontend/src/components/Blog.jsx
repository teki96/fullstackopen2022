import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.likeBlog(blog.id, updatedBlog);
    console.log(returnedBlog);
    updateBlog(returnedBlog);
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && (
            <button onClick={() => handleDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
