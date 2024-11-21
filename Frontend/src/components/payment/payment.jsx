import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./payment.css";

import Swal from "sweetalert2";

const Checkout = () => {
  const location = useLocation();
  const data = location.state.data;
  const totalPrice = location.state.totalPrice;
  const shipping = location.state.shipping;
  const navigate = useNavigate();

  const goCheckout = () => {
    navigate("/checkout");
  };

  const onContinue = async () => {
    // try {
    //   let products = [];
    //   data.forEach((item) => {
    //     const updatedPrice = shipping ? item.price + 5 : item.price;
    //     products.push({
    //       productId: item.productId,
    //       productName: item.productName,
    //       price: updatedPrice,
    //       quantity: item.quantity,
    //       description: item.description,
    //       farmer_id: item.farmer_id,
    //       image: item.image,
    //       shipping: shipping,
    //     });
    //   });
    //   const response = await fetch("http://localhost:4000/api/order/place", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": localStorage.getItem("token"),
    //     },
    //     body: JSON.stringify({
    //       price: data.price,
    //       cat: data.cat,
    //       buyer_id: data.buyer_id,
    //       buyerName: data.buyerName,
    //       date: data.date,
    //       products: products,
    //     }),
    //   });
    //   const json = await response.json();
    //   console.log(json);
    //   if (json.success) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Order Placed",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate("/");
    //   } else {
    //     Swal.fire({
    //       icon: "warning",
    //       title: "Not Listed",
    //       text: "",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <section className="cartSection mb-5 checkoutPage">
      <div className="container">
        <form>
          <div className="row check_body">
            <div className="col-md-8">
              <div className="address_body">
                <h1 className="address_heading container">Payment </h1>
                <>
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-5">
                      <div className=" rounded-3">
                        <div className=" p-4">
                          <div className="text-center mb-4">
                            <h3>Settings</h3>
                            <h6>Payment</h6>
                          </div>
                          <form>
                            <p className="fw-bold mb-4 pb-2">Saved cards:</p>

                            <div className="d-flex flex-row align-items-center mb-4 pb-1">
                              <img
                                className="img-fluid"
                                src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                                alt="Mastercard"
                              />
                              <div className="flex-fill mx-3">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="formControlLgXc"
                                    className="form-control form-control-lg"
                                    value="**** **** **** 3193"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="formControlLgXc"
                                  >
                                    Card Number
                                  </label>
                                </div>
                              </div>
                              <a href="#!">Remove card</a>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 pb-1">
                              <img
                                className="img-fluid"
                                src="https://img.icons8.com/color/48/000000/visa.png"
                                alt="Visa"
                              />
                              <div className="flex-fill mx-3">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="formControlLgXs"
                                    className="form-control form-control-lg"
                                    value="**** **** **** 4296"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="formControlLgXs"
                                  >
                                    Card Number
                                  </label>
                                </div>
                              </div>
                              <a href="#!">Remove card</a>
                            </div>

                            <p className="fw-bold mb-4">Add new card:</p>

                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                id="formControlLgXsd"
                                className="form-control form-control-lg"
                                value="Anna Doe"
                              />
                              <label
                                className="form-label"
                                htmlFor="formControlLgXsd"
                              >
                                Cardholder's Name
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-7">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="formControlLgXM"
                                    className="form-control form-control-lg"
                                    value="1234 5678 1234 5678"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="formControlLgXM"
                                  >
                                    Card Number
                                  </label>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="form-outline">
                                  <input
                                    type="password"
                                    id="formControlLgExpk"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="formControlLgExpk"
                                  >
                                    Expire
                                  </label>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="form-outline">
                                  <input
                                    type="password"
                                    id="formControlLgcvv"
                                    className="form-control form-control-lg"
                                    placeholder="Cvv"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="formControlLgcvv"
                                  >
                                    Cvv
                                  </label>
                                </div>
                              </div>
                            </div>

                            <button className="btn btn-success btn-lg btn-block">
                              Add card
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
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
              className="btn-g btn-lg proceed-btn go_to_checkout_btn"
              onClick={goCheckout}
            >
              <i class="fa-solid fa-arrow-left"></i> &nbsp; Go Back
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
