const Blog = ({ blog }) => {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <span className="author">Por: {blog.author}</span> 
      <a href={blog.url} className="read-more">{blog.url}</a>
    </div>
  );
};
export default Blog