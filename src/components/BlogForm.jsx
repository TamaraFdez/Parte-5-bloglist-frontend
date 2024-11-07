import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setErrorMessage, setSuccessMessage }) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      // Crear un nuevo blog 
      const createdBlog = await blogService.create(newBlog)

      // Añadir el nuevo blog 
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog])

      // Mostrar mensaje de éxito
      setSuccessMessage(`Blog "${createdBlog.title}" añadido con éxito!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
   
      setErrorMessage('Error al añadir el blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Añadir nuevo blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Autor:</label>
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type="submit">Añadir blog</button>
      </form>
    </div>
  )
}

export default BlogForm
