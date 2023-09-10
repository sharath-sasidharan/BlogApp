const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // required: [true, "user is required"],
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blog", blogSchema);

module.exports = Blogs;
