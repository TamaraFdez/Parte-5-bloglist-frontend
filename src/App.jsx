import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import loginService from './services/login'
import registerService from './services/register'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [user, setUser] = useState(null)

  // login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // registro
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newName, setNewName] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)

      setUsername('')
      setPassword('')
      
      setSuccessMessage('Inicio de sesión exitoso!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Credenciales incorrectas')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const newUser = await registerService.register({
        username: newUsername,
        password: newPassword,
        name: newName,
      })
      setNewUsername('')
      setNewPassword('')
      setNewName('')
      setSuccessMessage('Registro exitoso. Ahora puedes iniciar sesión.')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error en el registro')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)

    setSuccessMessage('Has cerrado sesión correctamente')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }


  return (
    <div>
      <h2>Blogs</h2>

      {/* Mostrar mensaje de error o éxito */}
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {/* Si el usuario está logueado */}
      {user ? (
        <div>
          <p>Bienvenido, {user.name}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>

          <BlogForm
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />

          <h2>Lista de Blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>
          {/* Formulario de Login */}
          <h3>Iniciar sesión</h3>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Iniciar sesión</button>
          </form>

          {/* Formulario de Registro */}
          <h3>Registrarse</h3>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="newUsername">Nuevo Nombre de Usuario:</label>
              <input
                type="text"
                value={newUsername}
                name="NewUsername"
                onChange={({ target }) => setNewUsername(target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPassword">Nueva Contraseña:</label>
              <input
                type="password"
                value={newPassword}
                name="NewPassword"
                onChange={({ target }) => setNewPassword(target.value)}
              />
            </div>
            <div>
              <label htmlFor="newName">Tu nombre:</label>
              <input
                type="text"
                value={newName}
                name="NewName"
                onChange={({ target }) => setNewName(target.value)}
              />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App

