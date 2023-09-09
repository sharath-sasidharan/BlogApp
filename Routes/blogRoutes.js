const express = require("express");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  singleBlog,
} = require("../Controllers/blogController");

//router object

const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);
router.put("/update-blog/:id", updateBlog);
router.get("/single-blog/:id", singleBlog);
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
