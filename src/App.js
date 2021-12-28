import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topbar from "../src/component/topbar/Topbar";
import Sidebar from "../src/component/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import User from "../src/pages/user/User";
import Product from "../src/pages/product/Product";
import NewUser from "../src/pages/newuser/NewUser";
import UserList from "../src/pages/userList/UserList";
import NewProduct from "../src/pages/newpoduct/NewProduct";
import ProductList from "../src/pages/productList/ProductList";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/Message/Messages";
import Editor from "./pages/news/richTextEditor/editor";
import CrudNews from "./pages/news/newsDashBoards/crudNews";
import EditorNews from "./pages/news/richTextEditor/editNews";
import { useState } from "react";
function App() {
  const [token, settoken] = useState("");
  const [ttAdmin, setttAdmin] = useState("");
  const loginSuccess = (token, tt) => {
    settoken(token);
    setttAdmin(tt);
    localStorage.setItem("accessToken", token);
  };
  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="/" element={<Login dn={loginSuccess} />} />
        </Routes>
      ) : (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="user/newuser" element={<NewUser />} />
              <Route path="/user/" element={<UserList />} />
              <Route path="/products/newproduct" element={<NewProduct />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/message" element={<Messages />} />
              <Route path="/editor" element={<Editor tt={ttAdmin} />} />
              <Route
                path="/editor/:userId"
                element={<EditorNews tt={ttAdmin} />}
              />
              <Route path="/newsdashboards" element={<CrudNews />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
