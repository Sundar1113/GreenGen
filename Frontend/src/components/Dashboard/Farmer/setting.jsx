import React, { useState } from "react";
import "./listing.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const Setting = () => {
  const [name, setName] = useState("");
  const [PHno, setPHno] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const States = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const navigate = useNavigate();

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPHnoChange = (event) => {
    setPHno(event.target.value);
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

  const validateName = () => {
    return name.length >= 3;
  };

  const validatePHno = () => {
    const pattern = /^\d{10}$/;

    // Test the number against the pattern
    return pattern.test(PHno);
  };

  const validateCity = () => {
    return city.trim() !== "";
  };

  const validateState = () => {
    const validStates = States;
    return validStates.includes(state.trim());
  };

  const validatePin = () => {
    return /^\d{6}$/.test(pin);
  };

  const onUpdate = async () => {
    try {
      if (
        validateCity() &&
        validateName() &&
        validatePin &&
        validateState() &&
        validatePHno()
      ) {
        const response = await fetch(`${BASE_URL}/api/update/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            role: localStorage.getItem("role"),
            name: name,
            PHno: PHno,
            state: state,
            city: city,
            pin: pin,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          Swal.fire({
            icon: "success",
            title: "Updated successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Not Update",
            text: "",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Fill all the fields",
          text: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function inputHandel(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className="list_heading container">Update Your Profile</h1>
      <form className="container list_body" onClick={inputHandel}>
        <div class="form-row list_main row">
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer01">User Name</label>
            <input
              type="text"
              className={
                validateName()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer01"
              placeholder="Name"
              required
              onChange={onNameChange}
            />
            {!validateName() ? (
              <div className="invalid-feedback">
                Name must be at least 3 characters long.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>

          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer02">Phone No.</label>
            <input
              type="text"
              className={
                validatePHno()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer02"
              placeholder="10-Digit"
              onChange={onPHnoChange}
              required
            />
            {!validatePHno() ? (
              <div className="invalid-feedback">Enter 10-Digit No.</div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
        </div>

        <div class="form-row row">
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer03">City</label>
            <input
              type="text"
              className={
                validateCity()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer03"
              placeholder="City"
              required
              onChange={onCityChange}
            />
            {!validateCity() ? (
              <div className="invalid-feedback">
                Please provide a valid city in India.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer04">State</label>
            <input
              type="text"
              className={
                validateState()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer04"
              placeholder="State"
              required
              onChange={onStateChange}
            />
            {!validateState() ? (
              <div className="invalid-feedback">
                Please provide a valid state of India.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer05">Pin Code</label>
            <input
              type="text"
              className={
                validatePin()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer05"
              placeholder="Pin Code"
              required
              onChange={onPinChange}
            />
            {!validatePin() ? (
              <div className="invalid-feedback">
                Please provide a valid 6-digit PIN code.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
        </div>
        <div class="form-group">
          {/* <div class="form-check">
            <input
              class="form-check-input is-invalid"
              type="checkbox"
              value=""
              id="invalidCheck3"
              required
            />
            <label class="form-check-label" for="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div> */}
        </div>
        <button class="btn btn-primary list_btn" onClick={onUpdate}>
          Update All
        </button>
      </form>
    </div>
  );
};

export default Setting;
