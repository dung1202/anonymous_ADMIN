import React, { useState } from "react";
import "./newuser.css";
// import { useNavigate } from "react-router-dom";
// import { createuser } from "../../axios";
export default function NewUser() {
  // let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const submit = (e) => {
    // e.preventDefault();
    // let body = {
    //   username,
    //   password,
    //   email: "admin@gmail.com",
    // };
    // createuser(body).then((res) => {
    //   console.log("dhsh");
    //   // navigate.push("/user");
    // });
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={submit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john"
          />
        </div>

        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
