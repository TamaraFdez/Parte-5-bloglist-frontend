import React from 'react';

const NewBlogForm = ({ handleNewBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
  <form onSubmit={handleNewBlog}>
    <h2>Añadir Nuevo Blog</h2>
    <div>
      Title:
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      URL:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">Guardar Blog</button>
  </form>
);

export default NewBlogForm;
