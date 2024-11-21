import React, { useState } from "react";
import "./listing.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import imgData from "../../../data/product_img_data";
import BASE_URL from "../../../Server/base_url";

const Listing = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState("vegetable");
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

  const onQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const onCatChange = (event) => {
    setCat(event.target.value);
  };
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onPriceChange = (event) => {
    setPrice(event.target.value);
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

  const validateDescription = () => {
    return description.length >= 10;
  };

  const validateQuantity = () => {
    const parsedQuantity = parseInt(quantity);
    return (
      !isNaN(parsedQuantity) && parsedQuantity >= 1 && parsedQuantity <= 100
    );
  };

  const validatePrice = () => {
    const parsedPrice = parseFloat(price);
    return !isNaN(parsedPrice) && parsedPrice >= 1 && parsedPrice <= 10000;
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

  const onList = async () => {
    try {
      if (
        validateDescription() &&
        validateName() &&
        validatePrice() &&
        validateQuantity()
      ) {
        let image;

        if (imgData[cat] && imgData[cat][name]) {
          image = imgData[cat][name];
          console.log(image);
        } else if (imgData[cat] && imgData[cat].all) {
          image = imgData[cat].all;
          console.log(image);
        } else {
          console.error(`Image not found for category: ${cat}`);
        }

        const response = await fetch(`${BASE_URL}/api/product/listing`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            productName: name,
            quantity: quantity,
            description: description,
            price: price,
            cat: cat,
            state: state,
            city: city,
            pin: pin,
            image: image,
          }),
        });

        const json = await response.json();

        if (json.success) {
          Swal.fire({
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "warning",
            title: "Not Listed",
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
      <h1 className="list_heading container">List A New Product</h1>
      <form className="container list_body" onClick={inputHandel}>
        <div class="form-row list_main row">
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer01">Product name</label>
            <input
              type="text"
              className={
                validateName()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer01"
              placeholder="Name of the product"
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

          <div class="col-sm-12 col-md-6 list_option">
            <label for="validationServer01">Category</label>
            <select
              className="form-select is-valid"
              id="inputGroupSelect03"
              aria-label="Example select with button addon"
              onChange={onCatChange}
              required
            >
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="flours">Atta & Flours</option>
              <option value="masala">Masala & Spices</option>
              <option value="rice">Rice & Rice products</option>
              <option value="dal">Dal & pulses</option>
            </select>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer02">Product Quantity</label>
            <input
              type="text"
              className={
                validateQuantity()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer02"
              placeholder="KG"
              onChange={onQuantityChange}
              required
            />
            {!validateQuantity() ? (
              <div className="invalid-feedback">
                Quantity must be a number between 1 and 100.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer02">Product Price</label>
            <input
              type="text"
              className={
                validatePrice()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer02"
              placeholder="Rs./KG"
              onChange={onPriceChange}
              required
            />
            {!validatePrice() ? (
              <div className="invalid-feedback">
                Price must be a number between 1 and 10000.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
        </div>
        <div class="col-sm-12 col-md-12 ">
          <label for="validationServer01">Product Description</label>
          <input
            type="text"
            className={
              validateDescription()
                ? "form-control is-valid"
                : "form-control is-invalid"
            }
            id="validationServer01"
            placeholder="Description"
            required
            onChange={onDescriptionChange}
          />
          {!validateDescription() ? (
            <div className="invalid-feedback">
              Description must be at least 10 characters long.
            </div>
          ) : (
            <div class="valid-feedback">Looks good!</div>
          )}
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
        <button class="btn btn-primary list_btn" onClick={onList}>
          List Product
        </button>
      </form>
    </div>
  );
};

export default Listing;
