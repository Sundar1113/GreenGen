// reviewForm.js
import React from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import "./addReview.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../../Server/base_url";

const ReviewForm = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.data;

  const [reviewFields, setReviewFields] = useState({
    review: "",

    rating: 0,
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewFields((prev) => ({
      ...prev,
      review: value,
    }));
  };

  const handleRatingChange = (newValue) => {
    setReviewFields((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onSubmit = async () => {
    if (reviewFields.rating > 0 && reviewFields.review.length > 0) {
      try {
        const response = await fetch(`${BASE_URL}/api/review/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            rating: reviewFields.rating,
            review: reviewFields.review,
            productId: item.productId,
            orderId: item._id,
            farmer_id: item.farmer_id,
            product_name: item.productName,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          }),
        });

        const json = await response.json();
        if (json.success) {
          Swal.fire({
            icon: "success",
            title: "Review Submitted",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Review & Rating",
        text: "",
      });
    }
  };

  const onHome = () => {
    navigate("/");
  };
  return (
    <>
      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row inventory_body">
            <div className="">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0 cart_head">Feedback Form</h1>
                  <p className="cart_head_sub">Add A Review Of This Product</p>
                </div>
                <button
                  className="ml-auto clearCart d-flex align-items-center empty-cart-btn btn btn-outline-success"
                  type="button"
                  onClick={onHome}
                >
                  Continue Shopping &nbsp;
                  <i class="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="row_center">Date</th>
                        <th className="row_center">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td width={"40%"}>
                          <div className="d-flex align-items-center">
                            <div className="img">
                              <Link>
                                <img
                                  src={item.image + "?im=Resize=(100,100)"}
                                  className="w-100"
                                />
                              </Link>
                            </div>

                            <div className="info pl-4">
                              <Link>
                                <h4>{item.productName}</h4>
                              </Link>
                              <h4 className="myOrder_info myOrder_info_price">
                                RS. {item.price}
                              </h4>
                              {item.quantity < 1 ? (
                                <h4 className="myOrder_info">
                                  Weight: {item.quantity * 1000}GM
                                </h4>
                              ) : (
                                <h4 className="myOrder_info">
                                  Weight: {item.quantity}KG
                                </h4>
                              )}
                            </div>
                          </div>
                        </td>

                        <td width="20%" align="center">
                          {new Date(item.date).toLocaleDateString()}
                        </td>

                        <td align="center" width="20%">
                          {item.status === "delivered" ? (
                            <div>
                              <span className="text-g status status_delivered">
                                {item.status.toUpperCase()}
                              </span>
                            </div>
                          ) : item.status === "canceled" ? (
                            <p className="text-g status status_cancelled">
                              {item.status.toUpperCase()}
                            </p>
                          ) : (
                            <span className="status text-g">
                              {item.status.toUpperCase()}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="container ">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Write A Review
                      </label>
                      <textarea
                        placeholder="Write a Review"
                        name="review"
                        value={reviewFields.review}
                        onChange={handleReviewChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="col-md-6 rating_body">
                      <Rating
                        name="rating"
                        className="review_rating"
                        value={reviewFields.rating}
                        precision={0.5}
                        onChange={(event, newValue) =>
                          handleRatingChange(newValue)
                        }
                      />
                      <p className="rating_point">({reviewFields.rating})</p>
                    </div>
                    <div className="col-md-6 submitReview_btn">
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={onSubmit}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewForm;
