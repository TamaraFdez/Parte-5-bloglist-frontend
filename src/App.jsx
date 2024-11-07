import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";
import registerService from "./services/register";
import Blog from "./components/Blog";
import "./app.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  // Estados para login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Estados para registro
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");

  // Estados para nuevo blog
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setSuccessMessage("¡Inicio de sesión exitoso!");
      setTimeout(() => setSuccessMessage(null), 5000);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Credenciales incorrectas");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await registerService.register({
        username: newUsername,
        password: newPassword,
        name: newName,
      });
      setSuccessMessage("Registro exitoso. Ahora puedes iniciar sesión.");
      setTimeout(() => setSuccessMessage(null), 5000);
      setNewUsername("");
      setNewPassword("");
      setNewName("");
    } catch (error) {
      setErrorMessage("Error en el registro");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setShowNewBlogForm(false);
      setSuccessMessage("¡Blog añadido correctamente!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage("Error al añadir el blog");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setSuccessMessage("¡Cierre de sesión exitoso!");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {!user ? (
        <>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
          <RegisterForm
            handleRegister={handleRegister}
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newName={newName}
            setNewName={setNewName}
          />
        </>
      ) : (
        <>
          <p>Bienvenido, {user.name}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
          <button onClick={() => setShowNewBlogForm(!showNewBlogForm)}>
            {showNewBlogForm ? "Ocultar" : "Añadir Nuevo Blog"}
          </button>
          {showNewBlogForm && (
            <NewBlogForm
              handleNewBlog={handleNewBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          )}
          
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
