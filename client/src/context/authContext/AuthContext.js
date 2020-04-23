import React, { useState } from "react";
import axios from "axios";

const Context = React.createContext();

function AuthContextProvider(props) {
  //User Input States from Register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Check User
  const [authLoading, setAuthLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [userName, setUserName] = useState("");
  //User Input States from Login
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [authLoadingLogin, setAuthLoadingLogin] = useState(false);
  //Error States
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [backendErr, setBackendErr] = useState("");

  //Regex Email Validation
  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
  };

  const validateRegister = () => {
    //isError will be true if any of the errors are triggered
    let isError = false;

    //If name is empty
    if (name === "") {
      isError = true;
      setNameError("Name is empty");
      setTimeout(() => {
        setNameError("");
      }, 2000);
    }
    //If email is empty
    if (email === "") {
      isError = true;
      setEmailError("Email is empty");
      setTimeout(() => {
        setEmailError("");
      }, 2000);
    }
    //If email is not valid
    let isValid = validateEmail(email);
    if (isValid === false) {
      isError = true;
      setEmailError("Email is invalid");
      setTimeout(() => {
        setEmailError("");
      }, 2000);
    }
    //If password is empty
    if (password === "") {
      isError = true;
      setPasswordError("Password is empty");
      setTimeout(() => {
        setPasswordError("");
      }, 2000);
    }
    //If confirm password is empty
    if (confirmPassword === "") {
      isError = true;
      setConfirmPasswordError("Password is empty");
      setTimeout(() => {
        setConfirmPasswordError("");
      }, 2000);
    }
    //Password length
    if (password.length < 6) {
      isError = true;
      setPasswordError("Password must be atleast 6 characters");
      setTimeout(() => {
        setPasswordError("");
      }, 2000);
    }
    //If both passwords don't match
    if (password !== confirmPassword) {
      isError = true;
      setPasswordError("Passwords Do not match");
      setConfirmPasswordError("Passwords Do not match");
      setTimeout(() => {
        setPasswordError("");
      }, 2000);
      setTimeout(() => {
        setConfirmPasswordError("");
      }, 2000);
    }

    //Will return boolean
    return isError;
  };
  const onRegister = async (e) => {
    e.preventDefault();
    // Loading as soon as submit is hit
    setAuthLoading(true);

    //err is booleon
    const err = validateRegister();
    if (err) {
      // Not loading anymore as soon as there is any error
      setAuthLoading(false);
    } else {
      console.log({ user: name, email, password });
      // Markup for async request to backend
      try {
        const addUser = await axios.post(
          "/api/auth/register",
          {
            username: name,
            email,
            password,
          },
          {
            headers: {
              "x-api-key": "A7ZD70AH55WN5LU3R3TW",
            },
          }
        );
        console.log(addUser);
        if (addUser) {
          console.log("User Registered");
          localStorage.setItem("token", addUser.data.token);
          setAuthToken(addUser.data.token);
          console.log(authToken);
          setIsLoggedIn(true);
          // Redirect to '/'
          window.location.pathname = "/";
        }
      } catch (err) {
        setBackendErr(err.response.data.msg);
        setTimeout(() => {
          setBackendErr("");
        }, 5000);
      }

      setTimeout(() => {
        // Not loading anymore when everything is successful
        setAuthLoading(false);
      }, 3000);
    }
  };

  const validateLogin = () => {
    //isError will be true if any of the errors are triggered
    let isError = false;

    //If email is empty
    if (emailLogin === "") {
      isError = true;
      setEmailError("Email is empty");
      setTimeout(() => {
        setEmailError("");
      }, 2000);
    }
    //If email is not valid
    let isValid = validateEmail(emailLogin);
    if (isValid === false) {
      isError = true;
      setEmailError("Email is invalid");
      setTimeout(() => {
        setEmailError("");
      }, 2000);
    }
    //If password is empty
    if (passwordLogin === "") {
      isError = true;
      setPasswordError("Password is empty");
      setTimeout(() => {
        setPasswordError("");
      }, 2000);
    }
    //Password length
    if (passwordLogin.length < 6) {
      isError = true;
      setPasswordError("Password must be atleast 6 characters");
      setTimeout(() => {
        setPasswordError("");
      }, 2000);
    }

    //Will return boolean
    return isError;
  };

  const onLogin = async (e) => {
    e.preventDefault();
    // Loading as soon as submit is hit
    setAuthLoadingLogin(true);
    //err is booleon
    const err = validateLogin();
    if (err) {
      setAuthLoadingLogin(false);
    } else {
      console.log({ email: emailLogin, passwordLogin });
      // Markup for async request to backend
      try {
        const loginUser = await axios.post(
          "/api/auth/login",
          {
            email: emailLogin,
            password: passwordLogin,
          },
          {
            headers: {
              "x-api-key": "A7ZD70AH55WN5LU3R3TW",
            },
          }
        );
        console.log(loginUser);
        if (loginUser) {
          console.log("User Logged In");
          localStorage.setItem("token", loginUser.data.token);
          setAuthToken(loginUser.data.token);
          console.log(authToken);
          setIsLoggedIn(true);
          // Redirect to '/'
          window.location.pathname = "/";
        }
      } catch (err) {
        setBackendErr(err.response.data.msg);
        setTimeout(() => {
          setBackendErr("");
        }, 5000);
      }
      setTimeout(() => {
        // Not loading anymore when everything is successful
        setAuthLoadingLogin(false);
      }, 3000);
    }
  };

  const onLogout = (e) => {
    e.preventDefault();

    setAuthLoadingLogin(false);
    localStorage.removeItem("token");
    setAuthToken("");
    setIsLoggedIn(false);
    console.log("User Logged Out");
  };

  // Check if user is logged in
  const checkIsLoggedIn = async (token) => {
    setCheckingUser(true);
    if (token) {
      const user = await axios.get("/api/auth/getuser", {
        headers: {
          "auth-token": token,
        },
      });
      console.log(user);
      if (user.data) {
        setUserName(user.data.username);
        setAuthToken(token);
        setIsLoggedIn(true);
        setCheckingUser(false);
      } else {
        setIsLoggedIn(false);
        setCheckingUser(false);
      }
    } else {
      setIsLoggedIn(false);
      setCheckingUser(false);
    }
  };
  return (
    <Context.Provider
      value={{
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
        validateLogin,
        onLogin,
        validateRegister,
        setEmailLogin,
        setPasswordLogin,
        authLoadingLogin,
        onLogout,
        isLoggedIn,
        checkIsLoggedIn,
        checkingUser,
        backendErr,
        authToken,
        userName,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, AuthContextProvider };
