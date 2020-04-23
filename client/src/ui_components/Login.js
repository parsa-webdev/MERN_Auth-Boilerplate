import React, { useContext } from "react";
import { Context } from "../context/authContext/AuthContext";
import Header from "./Header";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const {
    setEmailLogin,
    setPasswordLogin,
    authLoadingLogin,
    onLogin,
    emailError,
    passwordError,
    backendErr,
  } = useContext(Context);
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onLogin} noValidate>
            <TextField
              error={emailError !== "" ? true : false}
              label="Error"
              helperText={emailError}
              onChange={(e) => setEmailLogin(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              error={passwordError !== "" ? true : false}
              label="Error"
              helperText={passwordError}
              onChange={(e) => setPasswordLogin(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              disabled={authLoadingLogin}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {authLoadingLogin ? "..." : "Sign In"}
            </Button>
            <Grid container>
              {backendErr !== "" ? (
                <Alert severity="error">{backendErr}</Alert>
              ) : null}
              <Grid item>
                Don't have an account?{" "}
                <Button
                  disabled={authLoadingLogin}
                  component={Link}
                  to="/signup"
                >
                  {" "}
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
