import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(!visible);

  const blogStyle = {
    padding: 10,
    border: "1px solid black",
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          likes {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>like</button>
          <br />
          {blog.user?.name || "unknown"}
          {user?.username === blog.user?.username && (
            <div>
              <button onClick={() => handleDelete(blog)}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
