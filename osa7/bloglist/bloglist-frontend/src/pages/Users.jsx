import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()

  const handleUserClick = (id) => {
    navigate(`/users/${id}`)
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
