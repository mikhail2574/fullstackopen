import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      notify(`Welcome ${user.name}`);
    } catch {
      notify("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const addBlog = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData);
      const fullBlog = { ...newBlog, user };
      setBlogs(blogs.concat(fullBlog).sort((a, b) => b.likes - a.likes));
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      blogFormRef.current.toggleVisibility();
    } catch {
      notify("failed to add blog", "error");
    }
  };

  const likeBlog = async (blog) => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user, // user can be an object or an id
    };

    try {
      const returned = await blogService.update(blog.id, updated);
      setBlogs(
        blogs
          .map((b) => (b.id === blog.id ? { ...returned, user: blog.user } : b))
          .sort((a, b) => b.likes - a.likes)
      );
    } catch {
      notify("liking failed", "error");
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        notify("blog removed");
      } catch {
        notify("failed to delete blog", "error");
      }
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={likeBlog}
          handleDelete={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
