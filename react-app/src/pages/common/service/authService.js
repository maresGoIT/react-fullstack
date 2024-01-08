import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

async function login(payload) {
  const response = await axios.post("/login", payload);

  return response;
}

async function register(payload) {
  //return await axios.post("/register", payload);
  const response = await axios.post("/register", payload);

  return response;
}

async function logout() {
  localStorage.removeItem("token");
}

const authService = {
  login,
  logout,
  register,
};

export default authService;
