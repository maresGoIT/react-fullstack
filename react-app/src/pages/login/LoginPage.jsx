import React, { useState } from "react";
import authService from "../common/service/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../redux/slices/authSlice";
import { selectUser } from "../../redux/selectors";
import Error from "../common/components/Error/Error";

function LoginPage() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const userInfo = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: emailLogin,
        password: passwordLogin,
      };

      await dispatch(loginUser(payload));
    } catch (err) {
      console.error("Failed to login the user ", err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: emailRegister,
      password: passwordRegister,
    };

    await dispatch(registerUser(payload));
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    authService.logout();
  };

  const errorMessage = userInfo?.error || "";

  return (
    <section>
      <code>{JSON.stringify(userInfo)}</code>
      {errorMessage.length > 0 && <Error message={errorMessage}></Error>}
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <label>
          <span>Email</span>
          <input type="text" onChange={(e) => setEmailLogin(e.target.value)} />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
        </label>

        <button>Login</button>
      </form>

      <form onSubmit={handleRegisterSubmit}>
        <h2>Register</h2>
        <label>
          <span>Email</span>
          <input
            type="text"
            onChange={(e) => setEmailRegister(e.target.value)}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
        </label>

        <button>Register</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}

export default LoginPage;
