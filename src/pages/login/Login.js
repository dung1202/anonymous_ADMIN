import { useState } from "react";
import { loginAdmin } from "../../axios";
import jwt_decode from "jwt-decode";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, seterr] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    submit();
  };

  const submit = () => {
    const body = {
      username,
      password,
    };
    if (username.length === 0 || password === 0) {
      seterr("Phải nhập đủ tên đăng nhập và mật khẩu");
    } else if (
      username.length < 8 ||
      username.length > 30 ||
      password.length > 30 ||
      password.length < 8
    ) {
      seterr("Tên đăng nhập hoặc mật khẩu sai");
    } else {
      loginAdmin(body).then((res) => {
        if (res.data.message !== "Login successfully!") {
          seterr("Tên đăng nhập hoặc mật khẩu sai");
        } else if (res.data.message === "Login successfully!") {
          console.log(res.data);
          const user = res.data.user
          user._id = jwt_decode(res.data.accessToken)._id;
          props.dn(res.data.accessToken, user);
        }
      });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontWeight: "600", marginBottom: "10px" }}>
        Đăng nhập Admin
      </div>
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            submit();
          }
        }}
      />
      <div style={{ color: "red", marginBottom: "10px" }}>{err}</div>
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};
export default Login;
