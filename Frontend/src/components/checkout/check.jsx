import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./check.css";
import BASE_URL from "../../Server/base_url";

import Swal from "sweetalert2";

const Checkout = () => {
  const location = useLocation();
  const data = location.state.data;
  const totalPrice = location.state.totalPrice;
  const shipping = location.state.shipping;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [PHno, setPHno] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const handleNewAddressClick = () => {
    setActiveButton("new");
    // Call your onNewAddress function here
    // Example: onNewAddress();
  };

  const handleDefaultAddressClick = () => {
    setActiveButton("default");
    // Call your onDefaultAddress function here
    // Example: onDefaultAddress();
  };

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

  function inputHandel(e) {
    e.preventDefault();
  }
  const goCart = () => {
    navigate("/cart");
  };

  const onContinue = () => {
    if (
      validateCity() &&
      validateName() &&
      validatePin &&
      validateState() &&
      validatePHno() &&
      activeButton === "new"
    ) {
      placeOrder();
    } else if (activeButton === "default") {
      placeOrder();
      console.log(data);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Select Address",
        text: "",
      });
    }
  };

  const placeOrder = async () => {
    try {
      let products = [];
      data.forEach((item) => {
        const updatedPrice = shipping ? item.price + 5 : item.price;
        products.push({
          productId: item.productId,
          productName: item.productName,
          price: updatedPrice,
          quantity: item.quantity,
          description: item.description,
          farmer_id: item.farmer_id,
          image: item.image,
          shipping: shipping,
        });
      });
      const response = await fetch(`${BASE_URL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          address: activeButton,
          name: name,
          PHno: PHno,
          state: state,
          city: city,
          pin: pin,
          price: data.price,
          cat: data.cat,
          buyer_id: data.buyer_id,
          buyerName: data.buyerName,
          date: data.date,
          products: products,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        Swal.fire({
          icon: "success",
          title: "Order Placed",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Not Listed",
          text: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="cartSection mb-5 checkoutPage">
      <div className="container">
        <form>
          <div className="row check_body">
            <div className="col-md-8">
              <div className="address_body">
                <h1 className="address_heading container">Delivery Address</h1>
                <form className="container list_body" onClick={inputHandel}>
                  <div class="form-row list_main row">
                    <div class="col-sm-12 col-md-6 ">
                      <label for="validationServer01">Name</label>
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
                    </div>
                  </div>
                  <div className="address_btn">
                    <button
                      className={`btn btn-outline-success address_buttons ${
                        activeButton === "new" ? "active" : ""
                      }`}
                      onClick={handleNewAddressClick}
                    >
                      Use New Address
                    </button>
                    <button
                      className={`btn btn-outline-success address_buttons ${
                        activeButton === "default" ? "active" : ""
                      }`}
                      onClick={handleDefaultAddressClick}
                    >
                      Use Default Address
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-4 cartRightBox">
              <div className="container proceed-body  p-4 ">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Subtotal</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="text-g black_color">{totalPrice}</span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Shipping Fee</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="black_color">
                      {!shipping ? "FREE" : 10}
                    </span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Discount</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="black_color">0</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Total Item</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="black_color"> {data.length}</span>
                  </h3>
                </div>

                {/* <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Estimate for</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">INDIA</h3>
                </div> */}

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Total Amount</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g black_color">
                      {!shipping ? totalPrice : totalPrice + data.length * 5}
                    </span>
                  </h3>
                </div>
                <br />
                <Button
                  className="btn-g btn-lg proceed-btn"
                  onClick={onContinue}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
          <div className="row container go_cart">
            <Button
              className="btn-g btn-lg proceed-btn go_to_cart_btn"
              onClick={goCart}
            >
              <i class="fa-solid fa-arrow-left"></i> &nbsp; Cart
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
