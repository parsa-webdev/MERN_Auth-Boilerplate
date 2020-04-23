import React, { useContext } from "react";
import { Context } from "../context/authContext/AuthContext";
import { Link } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const { onLogout, isLoggedIn, checkingUser } = useContext(Context);
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <>Company Name</>
          </Link>
        </div>
        <nav>
          {checkingUser ? (
            <></>
          ) : (
            <>
              {!isLoggedIn ? (
                <>
                  <Link to="/">
                    <>Home</>
                  </Link>
                  <Link
                    to="/posts"
                    style={{ color: "red", textDecoration: "line-through" }}
                  >
                    <>Posts</>
                  </Link>
                  <Link to="/login" className="login">
                    <>Log In</>
                  </Link>
                  <Link to="/signup" className="signup">
                    <>Sign Up</>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <>Home</>
                  </Link>
                  <Link to="/posts" style={{ color: "green" }}>
                    <>Posts</>
                  </Link>
                  <a href="#" onClick={onLogout} className="logout">
                    <>Log Out</>
                  </a>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
