import React, { useState } from "react";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../Server/base_url";

const Signup = ({ loadUser, onRouteChange }) => {
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const onRoleChange = (event) => {
    setRole(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPhnoChange = (event) => {
    setPhno(event.target.value);
  };
  const onStateChange = (event) => {
    setState(event.target.value);
  };
  const onCityChange = (event) => {
    setCity(event.target.value);
  };
  const onPinChange = (event) => {
    setPin(event.target.value);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const onSubmitSignUp = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: role,
        email: email,
        password: password,
        name: name,
        phno: phno,
        state: state,
        city: city,
        pin: pin,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("role", json.role);
      handleClick();
    } else if (json === "Exist") {
      Swal.fire({
        icon: "warning",
        title: "User ALready Exist",
        text: "",
      });
    } else if (json.error === "pin") {
      Swal.fire({
        icon: "warning",
        title: "Give a valid PIN code",
        text: "",
      });
    } else if (json.error === "phno") {
      Swal.fire({
        icon: "warning",
        title: "Give a valid Phone No",
        text: "",
      });
    } else if (json.error === "state") {
      Swal.fire({
        icon: "warning",
        title: "Give a valid state Name",
        text: "",
      });
    } else if (json.error === "email") {
      Swal.fire({
        icon: "warning",
        title: "Give a valid Email",
        text: "",
      });
    } else if (json.error === "password") {
      Swal.fire({
        icon: "warning",
        title: "Give a valid Password",
        text: "",
      });
    } else if (json.error === "name") {
      Swal.fire({
        icon: "warning",
        title: "Give a valid Name",
        text: "",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Invalid Credentials",
        text: "",
      });
    }
  };
  return (
    <div className="container whole-body">
      <div className="form-container-signup">
        <p className="title">SignUp</p>

        <div className="input-group mb-3 option_signup">
          <select
            className="form-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            onChange={onRoleChange}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <div className="input-group">
          <label for="username">Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            onChange={onNameChange}
          />
        </div>
        <div className="input-group">
          <label for="username">Phone Number</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            onChange={onPhnoChange}
          />
        </div>

        <div className="input-group">
          <label for="email">Email</label>
          <input
            type="text"
            name="username"
            id="username"
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
        </div>
        <div className="input-group">
          <label for="username">State</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            onChange={onStateChange}
          />
        </div>
        <div className="input-group">
          <label for="username">City</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            onChange={onCityChange}
          />
        </div>
        <div className="input-group">
          <label for="username">PIN code</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            onChange={onPinChange}
          />
        </div>

        <button className="sign" onClick={onSubmitSignUp}>
          SignUp
        </button>
        <p className="signup">
          Already have an account?
          <Link rel="noopener noreferrer" to="/login" class="">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
