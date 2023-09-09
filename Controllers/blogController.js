const Blogs = require("../models/blogsModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    //validation
    if (!title || !description || !image) {
      return res.status(400).json({
        message: "Please fill the required fields",
      });
    }

    const newBlog = new Blogs({ title, description, image });
    await newBlog.save();
    return res.status(200).json({
      message: "Blog created",
      success: true,
      newBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    return res.status(200).json({
      Count: blogs.length,
      message: "Blog fetched success",
      success: true,
      blogs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBlog = await Blogs.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Blog Updated Success",
      success: true,
      updateBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
exports.singleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPage = await Blogs.findById(id);
    if (!blogPage) {
      return res.status(400).json({
        success: false,
        message: "Blog not Found",
      });
    }
    return res.status(200).json({
      message: "Blog View Page",
      success: true,
      blogPage,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      message: "Blog Deleted Success",
      success: true,
      blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
