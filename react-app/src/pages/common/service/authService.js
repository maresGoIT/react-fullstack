import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

async function login(payload) {
  const response = await axios.post("/login", payload);

  console.dir(response.data);
  return response.data;
}

async function register(payload) {
  return await axios.post("/register", payload);
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
