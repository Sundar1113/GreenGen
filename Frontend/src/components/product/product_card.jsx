import React from "react";
import "./product.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Product = (props) => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const product = props.data;

  const data = {
    tag: 10,
    id: 1,
    name: product.productName,
    price: product.price,
    // oldPrice: 200,
    image: product.image,
    brand: product.owner,
    rating: product.rating,
    quantity: product.quantity,
  };

  const onDetail = () => {
    navigate("/details", { state: { id: product._id } });
  };

  return (
    <div className="productThumb">
      {/* {data.tag !== null && data.tag !== undefined && (
        <span className={`badge ${data.tag}`}>{data.tag}</span>
      )} */}

      {data !== undefined && (
        <>
          <div onClick={onDetail} className="cursor">
            <div className="imgWrapper">
              <div className="p-4 wrapper mb-3">
                <img
                  src={data.image + "?im=Resize=(420,420)"}
                  className="w-100"
                />
              </div>
            </div>
          </div>

          <div className="info">
            <span className="d-block catName">{data.brand}</span>
            <h4 className="title">
              <Link>{data.name}</Link>
            </h4>
            <Rating
              name="half-rating-read"
              value={parseFloat(data.rating)}
              precision={0.5}
              readOnly
            />
            <span className="brand d-block text-g">
              By <Link className="text-g">{data.brand}</Link>
            </span>

            <div className="d-flex align-items-center mt-3">
              <div className="d-flex align-items-center w-100">
                <span className="price text-g font-weight-bold">
                  Rs {data.price}/KG
                </span>{" "}
                {/* <span className="oldPrice ml-auto">{data.quantity}KG</span> */}
              </div>
            </div>
            {role == "farmer" ? (
              <></>
            ) : (
              <Button
                className="w-100 transition mt-3"
                onClick={onDetail}
                //   onClick={() => addToCart(productData)}
              >
                <i class="fa-solid fa-eye"></i>
                {/* {isAdded === true ? "Added" : "Add"} */}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
