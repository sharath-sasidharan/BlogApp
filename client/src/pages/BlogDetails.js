import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  let { id } = useParams();

  // getBlogDetail
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blogs/single-blog/${id}`);
      if (data?.success) {
        setInputs(data?.blogPage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // handleInput change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blogs/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign={"center"}
          >
            Update A Blog
          </Typography>
          <TextField
            placeholder="title"
            value={inputs.title}
            onChange={handleChange}
            name="title"
            margin="normal"
            type="text"
            required
          />
          <TextField
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
            name="description"
            margin="normal"
            type="text"
            required
          />
          <TextField
            placeholder="image"
            value={inputs.image}
            onChange={handleChange}
            name="image"
            margin="normal"
            type="text"
            required
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: "30px", marginTop: 3 }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};
export default BlogDetails;
