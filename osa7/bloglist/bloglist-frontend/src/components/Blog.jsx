import Stack from 'react-bootstrap/Stack'
import { useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = ({ blog }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/blogs/${blog.id}`)
  }

  return (
    <ListGroup>
      <ListGroup.Item onClick={handleClick} style={{ cursor: 'pointer' }}>
        <strong>{blog.title}</strong> by {blog.author}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default Blog
