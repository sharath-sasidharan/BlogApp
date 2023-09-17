const Blogs = require("../models/blogsModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        message: "Please fill the required fields",
      });
    }

    //UserExist check
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const newBlog = new Blogs({ title, description, image, user });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
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
    const blogs = await Blogs.find({}).populate("user");
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
    const blog = await Blogs.findByIdAndDelete(id).populate("user");
    if (blog.user && blog.user.blogs) {
      blog.user.blogs.pull(blog);
      await blog.user.save();
    }

    return res.status(200).json({
      message: "Blog Deleted Success",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("blogs");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user Blog not found",
      });
    }
    return res.status(200).json({
      message: "User Blog List Fetched",
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
