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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const {
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    authLoading,
    onRegister,
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
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
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={onRegister} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={nameError !== "" ? true : false}
                  label="Error"
                  helperText={nameError}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError !== "" ? true : false}
                  label="Error"
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError !== "" ? true : false}
                  label="Error"
                  helperText={passwordError}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={confirmPasswordError !== "" ? true : false}
                  label="Error"
                  helperText={confirmPasswordError}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="password2"
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="password2"
                />
              </Grid>
            </Grid>
            <Button
              disabled={authLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {authLoading ? "..." : "Sign Up"}
            </Button>
            <Grid container justify="flex-end">
              {backendErr !== "" ? (
                <Alert severity="error">{backendErr}</Alert>
              ) : null}
              <Grid item>
                Already have an account?{" "}
                <Button disabled={authLoading} component={Link} to="/login">
                  {" "}
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
