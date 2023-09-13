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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // Global State
  const isLogin = useSelector((state) => state.isLogin);
  //Normal State
  const [value, setValue] = useState();

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
              <Button sx={{ margin: 1, color: "white" }}>Logout</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
