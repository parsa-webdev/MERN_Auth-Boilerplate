import React, { useContext } from "react";
import Header from "../Header";
import { Context } from "../../context/authContext/AuthContext";
export default function Posts() {
  const { userName } = useContext(Context);
  return (
    <>
      <Header />
      <div className="content">
        {userName !== "" ? `${userName}'s Posts` : "..."}
      </div>
    </>
  );
}
