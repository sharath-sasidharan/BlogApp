import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Link } from "@mui/material";

let user_name;
export const BlogUser = () => {
  const [blogs, setBlog] = useState([]);
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("user");
      const { data } = await axios.get(`/api/v1/blogs/user-blog/${id}`);
      user_name = data.user.username;

      if (data?.success) {
        setBlog(data?.user.blogs);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            blogId={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={user_name}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            color: "#0652DD",
            fontWeight: "400",
          }}
        >
          Blog Not Found, Please
          <Link
            href="/add"
            style={{
              textDecoration: "none",
              background: "#e74c3c",
              color: "#ecf0f1",
              margin: "0 10px",
            }}
          >
            Click Here
          </Link>
          To Create Your First Blog
        </h1>
      )}
    </>
  );
};
