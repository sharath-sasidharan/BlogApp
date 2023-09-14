import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        alert("Register Success");
        navigate("/login");
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
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={inputs.username}
            onChange={handleChange}
            name="username"
            margin="normal"
            type="text"
            required
          />
          <TextField
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type="password"
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
          <Button
            onClick={() => navigate("/login")}
            type="submit"
            color="primary"
            sx={{ borderRadius: "30px", marginTop: 3 }}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Register;
