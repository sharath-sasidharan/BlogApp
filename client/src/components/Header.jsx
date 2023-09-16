import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Global State
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("user");
  //Normal State
  const [value, setValue] = useState();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
    toast.success("Logout Success");
    localStorage.clear();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>

          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs"></Tab>
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"></Tab>
                <Tab label="Add Blog" LinkComponent={Link} to="/add"></Tab>
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}

            {isLogin && (
              <Button
                onClick={logoutHandler}
                sx={{ margin: 1, color: "white" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
