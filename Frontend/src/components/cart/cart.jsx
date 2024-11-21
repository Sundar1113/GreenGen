import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from "sweetalert2";
import BASE_URL from "../../Server/base_url";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [shipping, setShipping] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch data from your backend API
    const getCartData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cart/checkout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setData(json);
        let total = 0;
        json.map((item) => {
          total += item.price;
        });
        if (total >= 100 && json.length > 0) {
          setShipping(false);
        } else if (json.length == 0) {
          setShipping(false);
        } else {
          setShipping(true);
        }
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    getCartData();
  }, [token]);

  console.log(data);

  //Delete a product from the cart
  const onRemove = (index) => {
    Swal.fire({
      title: "Remove This Product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3bb77e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(index);
      }
    });
  };
  const deleteItem = async (index) => {
    try {
      const response = await fetch(`${BASE_URL}/api/cart/deleteOne/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      console.log(json);
      setData(json);
      let total = 0;
      json.map((item) => {
        total += item.price;
      });
      setTotalPrice(total);
      if (total >= 100 && json.length > 0) {
        setShipping(false);
      } else if (json.length == 0) {
        setShipping(false);
      } else {
        setShipping(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Empties the cart
  const onClearCart = () => {
    if (data.length > 0) {
      Swal.fire({
        title: "Empty cart",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3bb77e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          emptyCart();
          setShipping(false);
        }
      });
    } else {
      Swal.fire("Cart is Already Empty");
    }
  };
  const emptyCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cart/emptyCart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      console.log(json);
      setData(json);
      let total = 0;
      json.map((item) => {
        total += item.price;
      });
      setTotalPrice(total);
      if (json) {
        Swal.fire({
          icon: "success",
          title: "Cart is empty",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Checkout
  const onCheckout = () => {
    console.log(data);
    navigate("/checkout", {
      state: {
        data: data,
        shipping: shipping,
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <>
      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row cart_body">
            <div className="col-md-8">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0 cart_head">Your Cart</h1>
                  <p className="cart_head_sub">
                    There are <span className="text-g">{data.length}</span>{" "}
                    products in your cart
                  </p>
                </div>

                <button
                  className="ml-auto clearCart d-flex align-items-center empty-cart-btn "
                  onClick={() => onClearCart()}
                >
                  Clear Cart &nbsp;
                  <i class="fa-solid fa-trash delete-cart-all"></i>
                </button>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length !== 0 &&
                        data.map((item, index) => {
                          return (
                            <tr>
                              <td width={"50%"}>
                                <div className="d-flex align-items-center">
                                  <div className="img">
                                    <Link to={`/product/${item.id}`}>
                                      <img
                                        src={
                                          item.image + "?im=Resize=(100,100)"
                                        }
                                        className="w-100"
                                      />
                                    </Link>
                                  </div>

                                  <div className="info pl-4">
                                    <Link to={`/product/${item.id}`}>
                                      <h4>{item.productName}</h4>
                                    </Link>

                                    <p>{item.farmerName}</p>
                                  </div>
                                </div>
                              </td>

                              <td width="20%">
                                <span>Rs.{item.price}</span>
                              </td>

                              <td>
                                {item.quantity < 1 ? (
                                  <h4 className="weight_in_cart">
                                    {item.quantity * 1000}GM
                                  </h4>
                                ) : (
                                  <h4 className="weight_in_cart">
                                    {item.quantity}KG
                                  </h4>
                                )}
                              </td>

                              <td align="center">
                                <button
                                  className="cursor "
                                  onClick={() => onRemove(index)}
                                >
                                  <i class="fa-solid fa-trash delete_btn_cart"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              <br />

              <div className="d-flex align-items-center">
                <Link to="/">
                  <Button className="btn-g btn-lg continue-shoping-btn">
                    <KeyboardBackspaceIcon /> Continue Shopping
                  </Button>
                </Link>
                {/* <Button className='btn-g ml-auto' onClick={updateCartData}>
                    <RefreshIcon /> Update Cart</Button> */}
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
                      {!shipping ? "FREE" : 5 * data.length}
                    </span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Discount</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="black_color">0</span>
                  </h3>
                </div>

                {/* <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Estimate for</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">INDIA</h3>
                </div> */}

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Total items</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g black_color">{data.length}</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Total Amount</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g black_color">
                      {!shipping ? totalPrice : totalPrice + data.length * 5}
                    </span>
                  </h3>
                </div>

                <br />
                {data.length > 0 && (
                  <Button
                    className="btn-g btn-lg proceed-btn"
                    onClick={onCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
