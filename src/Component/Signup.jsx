import * as React from "react";
import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { checkUser, register } from "../redux/authReducer/authAction";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";

const theme = createTheme();

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "username":
      return {
        ...state,
        username: action.payload,
      };
    case "mobile":
      return {
        ...state,
        mobile: action.payload,
      };
    default: {
      return state;
    }
  }
}

const initialState = {
  name: "",
  email: "",
  username: "",
  password: "",
  mobile: "",
  token: uuidv4(),
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setter] = useReducer(reducer, initialState);
  // const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.authReducer.isLoading);
  const users = useSelector((state) => state.authReducer.userData);

  useEffect(() => {
    if (!users.length) {
      dispatch(checkUser());
    }
  }, []);

  const [valid, setValid] = useState({
    name: false,
    email: false,
    password: false,
    username: false,
    mobile: false,
  });

  const handleSubmit = () => {
    if (!state.name) setValid({ name: true });
    if (!state.email) setValid({ email: true });
    if (!state.password) setValid({ password: true });
    if (!state.username) setValid({ username: true });
    if (state.mobile.length !== 10) setValid({ mobile: true });

    if (
      state.name &&
      state.email &&
      state.password &&
      state.username &&
      state.mobile.length === 10 &&
      !Loading
    ) {
      //checking if the user is alrady signed up or not
      let currentUser = users
        .map((user) => user.email)
        .find((item) => item === state.email);
      if (currentUser) {
        return window.alert({
          title: "Registration failed",
          description: "User already exists. PLease Login",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      
      dispatch(register(state)).then((r) => {
        if (r.type === "SIGNUP_ERROR") {
          return window.alert({
            title: "Something Went Wrong",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        window.alert({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login", { replace: true });
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <hr />
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="name"
                  isRequired
                  isInvalid={valid.name}
                  label="Name"
                  autoFocus
                  type="text"
                  value={state.name}
                  onChange={(e) => {
                    setter({ type: "name", payload: e.target.value });
                    setValid({ name: false });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  isRequired
                  isInvalid={valid.username}
                  label="UserName"
                  name="UserName"
                  autoComplete="family-name"
                  type="text"
                  value={state.username}
                  onChange={(e) => {
                    setter({ type: "username", payload: e.target.value });
                    setValid({ username: false });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  isRequired
                  isInvalid={valid.email}
                  label="Email Address"
                  name="Email Address"
                  autoComplete="email"
                  type="email"
                  value={state.email}
                  onChange={(e) => {
                    setter({ type: "email", payload: e.target.value });
                    setValid({ email: false });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(e) => {
                    setter({ type: "password", payload: e.target.value });
                    setValid({ password: false });
                  }}
                  id="password"
                  isRequired
                  isInvalid={valid.password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Mobile"
                  id="mobile"
                  isRequired
                  isInvalid={valid.mobile}
                  label="Mobile Number"
                  type="number"
                  value={state.mobile}
                  onChange={(e) => {
                    setter({ type: "mobile", payload: e.target.value });
                    setValid({ mobile: false });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              className="ButtonDiv"
              variant="contained"
              style={{ marginTop: "40px" }}
              onClick={handleSubmit}
              isLoading={Loading}
              loadingText="Submitting"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
