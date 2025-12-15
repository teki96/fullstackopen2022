import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const navStyle = {
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'grey',
    opacity: 0.9,
  }

  const linkStyle = {
    paddingRight: 10,
  }

  return (
    <>
      {user && (
        <Nav className="justify-content-center" style={navStyle}>
          <Link style={linkStyle} to="/">
            blogs
          </Link>
          <Link style={linkStyle} to="/users">
            users
          </Link>
          <span style={linkStyle}>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </Nav>
      )}
    </>
  )
}

export default NavBar
