import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
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
    <div style={navStyle}>
      <Link style={linkStyle} to="/">
        blogs
      </Link>
      <Link style={linkStyle} to="/users">
        users
      </Link>
      {user && (
        <>
          <span style={linkStyle}>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
    </div>
  )
}

export default NavBar
