import React from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa6";
import "../details.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const CartBtn = (props) => {
  const data = props.data;
  const price = props.price;
  const quantity = props.quantity;
  const image = props.image;
  const sendQ = props.sendQ;
  const navigate = useNavigate();

  const [isAdded, setIsAdded] = useState(false);
  const [isAlreadyAddedInCart, setIsAlreadyAddedInCart] = useState(false);
  const addToCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          productId: data._id,
          productName: data.productName,
          quantity: sendQ,
          description: data.description,
          price: price,
          cat: data.cat,
          farmer_id: data.owner_id,
          farmerName: data.owner,
          date: data.date,
          image: image,
        }),
      });
      const json = await response.json();

      if (json.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "item added to cart",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsAdded(true);
        setIsAlreadyAddedInCart(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goCart = async () => {
    navigate("/cart");
  };
  return (
    <div className="d-flex align-items-center">
      {isAdded || isAlreadyAddedInCart ? (
        <Button
          className={`btn-g btn-lg addtocartbtn ${
            isAlreadyAddedInCart === true && "no-click"
          }`}
          onClick={goCart}
        >
          Go To Cart &nbsp;
          <FaArrowRight />
        </Button>
      ) : (
        <Button
          className={`btn-g btn-lg addtocartbtn ${
            isAlreadyAddedInCart === true && "no-click"
          }`}
          onClick={addToCart}
        >
          <i class="fa-solid fa-cart-shopping"></i>&nbsp; Add To Cart
        </Button>
      )}
      {/* <Button className=" btn-lg addtocartbtn  ml-3  wishlist btn-border">
        <FavoriteBorderOutlinedIcon />{" "}
      </Button> */}
    </div>
  );
};

export default CartBtn;
