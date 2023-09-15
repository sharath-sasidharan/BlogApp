import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

const CreateBlog = () => {
  const id = localStorage.getItem("user");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

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
      const { data } = await axios.post("/api/v1/blogs/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data.success) {
        alert("Blog Created Success");
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
            Add Blog
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
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: "30px", marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};
export default CreateBlog;
