import React from "react";
import Rating from "@mui/material/Rating";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Slider from "react-slick";
import { useRef } from "react";
import { useState } from "react";
import "../details.css";
import CartBtn from "../CartBtn/cartBtn";

const View = (props) => {
  const role = localStorage.getItem("role");
  const data = props.data;
  console.log(data);

  const zoomSliderBig = useRef();
  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  const weight = ["100g", "250g", "500g", "1kg", "2kg"];

  const [price, setPrice] = useState(data.price);
  const [quantity, setQuantity] = useState("1kg");
  const [sendQuantity, setSendQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(3);
  const p = data.price;

  const isActive = (index) => {
    setActiveSize(index);

    //Change Price
    if (weight[index] == "100g") {
      setPrice(p * 0.1);
      setQuantity(weight[index]);
      setSendQuantity(0.1);
    } else if (weight[index] == "250g") {
      setPrice(p * 0.25);
      setQuantity(weight[index]);
      setSendQuantity(0.25);
    } else if (weight[index] == "500g") {
      setPrice(p * 0.5);
      setQuantity(weight[index]);
      setSendQuantity(0.5);
    } else if (weight[index] == "1kg") {
      setPrice(p * 1);
      setQuantity(weight[index]);
      setSendQuantity(1);
    } else if (weight[index] == "2kg") {
      setPrice(p * 2);
      setQuantity(weight[index]);
      setSendQuantity(2);
    }
  };
  return (
    <div className="row product_margin_top">
      {/* productZoom code start here */}
      <div className="col-md-5">
        <div className="productZoom">
          <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
            <div className="item">
              <InnerImageZoom zoomType="hover" zoomScale={1} src={data.image} />
            </div>
          </Slider>
        </div>
      </div>
      {/* productZoom code ends here */}

      {/* product info code start here */}
      <div className="col-md-7 productInfo">
        <h1>{data.productName}</h1>
        <div className="d-flex align-items-center mb-4 mt-3">
          <Rating
            name="half-rating-read"
            value={parseFloat(data.rating)}
            precision={0.5}
            readOnly
          />
          <span className=" ml-2">({data.rating})</span>
        </div>

        <div className="priceSec d-flex align-items-center mb-3">
          <span className="text-g priceLarge">Rs {price}</span>
          <div className="ml-3 d-flex flex-column">
            {/* <span className="text-org">{data.discount}% Off</span>
                  <span className="text-light oldPrice">
                    Rs {data.oldPrice}
                  </span> */}
          </div>
        </div>

        <p>{data.description}</p>

        {data.CurQuantity >= 2 ? (
          <>
            {weight !== undefined && weight.length !== 0 && (
              <div className="productSize d-flex align-items-center">
                <span>Size / Weight:</span>
                <ul className="list list-inline mb-0 pl-4">
                  {weight.map((item, index) => {
                    return (
                      <li className="list-inline-item">
                        <a
                          className={`tag ${
                            activeSize === index ? "active" : ""
                          }`}
                          onClick={() => isActive(index)}
                        >
                          {item}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Cart Button */}
            {role === "buyer" && (
              <div className="d-flex align-items-center">
                <CartBtn
                  data={data}
                  price={price}
                  quantity={quantity}
                  sendQ={sendQuantity}
                  image={data.image}
                />
              </div>
            )}
          </>
        ) : (
          <button type="button" class="btn btn-outline-danger outofstock_btn">
            Out Of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default View;
