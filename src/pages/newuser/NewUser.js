import React, { useEffect, useState } from "react";
import "./newuser.css";
import { useParams, useNavigate } from "react-router-dom";
import { createuser } from "../../axios";
export default function NewUser() {
  const param = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hash, setHash] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const submit = () => {
    let body = {
      username,
      hash,
      email,
      role: "admin",
      address,
      phone,
      gender,
      dob,
    };
    createuser(body).then((res) => {
      navigate.push("/user");
    });
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <input type="file" />
        </div>
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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@gmail.com"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="password"
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder=" 123 456 78"
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Việt Nam"
          />
        </div>
        <div className="newUserItem">
          <label>Dob</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Việt Nam"
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Việt Nam"
          />
        </div>
        <button className="newUserButton" onClick={submit}>
          Create
        </button>
      </form>
    </div>
  );
}
