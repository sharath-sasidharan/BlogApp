import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get Blogs

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blogs/get-blogs");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      <BlogCard />
    </>
  );
};
export default Blogs;
