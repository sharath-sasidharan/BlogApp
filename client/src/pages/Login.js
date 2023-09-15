import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
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
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("user", data?.user._id);
        dispatch(authActions.login());
        alert("Login Success");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <img src="login.png" style={{ flex: 0 }} alt="login" />
          <Box
            maxWidth={450}
            display={"flex"}
            flex={3}
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
              Login
            </Typography>

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
              onClick={() => navigate("/register")}
              type="submit"
              color="primary"
              sx={{ borderRadius: "30px", marginTop: 3 }}
            >
              Not a user ? Please Register
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
};
export default Login;
