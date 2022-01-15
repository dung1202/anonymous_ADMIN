import React, { useState } from "react";
import "./newuser.css";
import { useNavigate } from "react-router-dom";
import { createuser } from "../../axios";
export default function NewUser() {
  let navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setusername(username.replace(/\s+/g, ""));
    let body = {
      username,
      password,
      email,
      role: "admin",
    };
    checkInput() &&
      createuser(body).then((res) => {
        console.log(res.data);
        setAlertMessage("");
        navigate.push("/user");
      });
  };

  const checkInput = () => {
    if (!checkusername()) {
      setAlertMessage("Your username should be 8-30 characters.");
      return false;
    }
    if (!checkEmail()) {
      setAlertMessage("Your email should be at most 30 characters.");
      return false;
    }
    if (!checkPassword()) {
      setAlertMessage("Your password should be 8-30 characters.");
      return false;
    }
    if (!checkRepeatPassword()) {
      setAlertMessage("Passwords are not the same as repeat passwords");
      return false;
    }
    return true;
  };

  const checkusername = () => username.length >= 8 && username.length <= 30;
  const checkEmail = () => email.length <= 30;
  const checkPassword = () => password.length >= 8 && password.length <= 30;
  const checkRepeatPassword = () =>
    repeatPassword.localeCompare(password) === 0;

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={submit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="john"
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="email"
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

        <div className="newUserItem">
          <label>Repeat Password</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setrepeatPassword(e.target.value)}
            placeholder="Repeat Password"
          />
        </div>
        <div className="signup-alert">{alertMessage}</div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
