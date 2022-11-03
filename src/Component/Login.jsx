import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../redux/authReducer/authAction";
import { Alert } from "@mui/material";

export default function Login() {
  const Loading = useSelector((state) => state.authReducer.isLoading);
  const users = useSelector((state) => state.authReducer.userData);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const theme = createTheme();

  useEffect(() => {
    if (!users.length) {
      dispatch(checkUser());
    }
  }, []);

  const [valid, setValid] = useState({
    password: false,
    username: false,
  });

  const handleSubmit = () => {
    if (!user) setValid({ username: true });
    if (!pass) setValid({ password: true });

    // checking if the user is present or not
    let currentUser = users.find((item) => {
      if (item.username === user && item.password === pass) {
        return user;
      }
    });

    if (!currentUser) {
      return alert({
        title: "Invalid Credentials.",
        description: "Try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    navigate("/", { replace: true });
    localStorage.setItem("token", currentUser.token);
    const userdata = {
      username: currentUser.username,
      email: currentUser.email,
      name: currentUser.name,
    };
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <hr />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              isRequired
              isInvalid={valid.username}
              label="UserName"
              name="email"
              autoComplete="email"
              type="text"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setValid({ username: false });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              isRequired
              isInvalid={valid.password}
              autoComplete="current-password"
              type="password"
              value={pass}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setPass(e.target.value);
                setValid({ password: false });
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              isLoading={Loading}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <Button
              className="ButtonDiv"
              variant="contained"
              onClick={() => {
                navigate("/Signup");
              }}
              style={{ marginTop: "40px" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
