const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
    return count;
  }, {});

  const mostBlogsAuthor = Object.entries(authorCount).reduce(
    (max, [author, blogs]) => (blogs > max.blogs ? { author, blogs } : max),
    { author: null, blogs: 0 }
  );

  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
    return likes;
  }, {});

  const mostLikesAuthor = Object.entries(authorLikes).reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    { author: null, likes: 0 }
  );

  return mostLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
