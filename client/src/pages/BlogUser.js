import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

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
          Blog Not Found, Please Create one !
        </h1>
      )}
    </>
  );
};
