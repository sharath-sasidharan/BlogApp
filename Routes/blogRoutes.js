const express = require("express");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  singleBlog,
  userBlogController,
} = require("../Controllers/blogController");

//router object

const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);
router.put("/update-blog/:id", updateBlog);
router.get("/single-blog/:id", singleBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/user-blog/:id", userBlogController);

module.exports = router;
