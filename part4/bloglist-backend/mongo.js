export const getAllBlogs = () => Blog.find({});
export const getBlogById = (id) => Blog.findById(id);
export const countBlogs = () => Blog.countDocuments({});
export const createBlog = (data) => new Blog(data).save();
export const deleteBlog = (id) => Blog.findByIdAndDelete(id);
export const updateBlog = (id, data) =>
  Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: "query",
  });

export default Person;
