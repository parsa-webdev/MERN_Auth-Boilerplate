import React, { useEffect, useContext } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./ui_components/Home";
import Login from "./ui_components/Login";
import SignUp from "./ui_components/SignUp";
import Posts from "./ui_components/post_components/Posts";
import { Context } from "./context/authContext/AuthContext";

export default function App() {
  const { checkIsLoggedIn } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    checkIsLoggedIn(token);
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />

          <PrivateRoute path="/posts" exact component={Posts} />

          <Route exact path="/signup">
            {localStorage.getItem("token") === null ? (
              <SignUp />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/login">
            {localStorage.getItem("token") === null ? (
              <Login />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const current = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        current === null ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
