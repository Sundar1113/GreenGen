import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../Server/base_url";

const Login = ({ loadUser, onRouteChange }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const onSubmitLogIn = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("role", json.role);
        handleClick();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Invalid Credentials",
          text: "",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container  whole-body-login">
        <div className="form-container">
          <p className="title">Login</p>

          <div className="input-group">
            <label for="username">Email</label>
            <input
              type="email"
              name="Email"
              placeholder=""
              onChange={onEmailChange}
            />
          </div>
          <div className="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={onPasswordChange}
            />

            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>
          <button className="sign" onClick={onSubmitLogIn}>
            Log in
          </button>

          <p className="signup">
            Don't have an account?
            <Link rel="noopener noreferrer" to="/signup" class="">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
