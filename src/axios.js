import axios from "axios";

const instantAxios = axios.create({
  timeout: 20000,
  baseURL: "https://voucherhunter.herokuapp.com",
  // baseURL: 'http://localhost:4000/'
});
instantAxios.interceptors.request.use((request) => {
  let token = localStorage.getItem("accessToken");
  request.headers["Authorization"] = "Bearer " + token;
  return request;
});
export const deleteuser = (id) => {
  return instantAxios.delete("/user/" + id);
};
export const getuser = () => {
  return instantAxios.get("/user/");
};
export const getuserid = (id) => {
  return instantAxios.get("/user/" + id);
};
export const updateuser = (body) => {
  return instantAxios.put("/user", body);
};

export const createuser = (body) => {
  return instantAxios.post("/register", body);
};

export const createproduct = (formData) => {
  return instantAxios.post("/product", formData);
};
export const getProductid = (id) => {
  return instantAxios.get("/product/" + id);
};
export const getProduct = () => {
  return instantAxios.get("/product");
};
export const updateproduct = (id, body) => {
  return instantAxios.put(`/product/${id}`, body);
};
export const deleteProduct = (id) => {
  return instantAxios.delete("/product/" + id);
};

export const CreateNews = (body, header) => {
  return instantAxios.post("/news/auth/create", body, header);
};

export const getNews = (number) => {
  return instantAxios.get("/news?page=" + number);
};

export const getNewsById = (id) => {
  return instantAxios.get("/news/" + id);
};

export const updateNews = (id, body, header) => {
  return instantAxios.put("/news/auth/update/" + id, body, header);
};

export const login = (body) => instantAxios.post("/login", body);
export const checkToken = () => instantAxios.post("/auth/checktoken");
