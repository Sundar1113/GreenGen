import React, { useEffect, useState } from "react";
import "./feedback.css";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";
import User_img from "../../../data/user_img.png";
import BASE_URL from "../../../Server/base_url";

const Feedback = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/product/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: props.data,
          }),
        });
        const json = await response.json();
        if (json.success) {
          setData(json.feedbacks);
          console.log(json.feedbacks);
        } else {
          console.error("Error fetching product details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, [props.data]);

  return (
    <>
      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row inventory_body">
            <div className="">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0 cart_head">Reviews</h1>
                  <p className="cart_head_sub">
                    There are <span className="text-g">{data.length}</span>
                    &nbsp; Reviews
                  </p>
                </div>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th className="row_center">Date</th>
                        <th className="row_center">Rating</th>
                        <th className="row_center">Review</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length !== 0 &&
                        [...data].reverse().map((item, index) => {
                          return (
                            <tr>
                              <td width="5%">
                                <div className="reviewsCard flex-row get_elements_center">
                                  <div className="image m-1">
                                    <div className="rounded-circle">
                                      <img src={User_img} />
                                    </div>
                                  </div>

                                  <div className="info">
                                    <p className="text-g d-block p-1 font-weight-bold">
                                      {item.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td width="10%" align="center">
                                <h5 className="text-dark">
                                  {new Date(item.date).toLocaleDateString()}
                                </h5>
                              </td>

                              <td align="center" width="20%">
                                <div className="d-flex align-items-center w-100  rating_show get_elements_center">
                                  <Rating
                                    className="review_rating"
                                    name="half-rating-read"
                                    value={item.rating}
                                    precision={0.5}
                                    readOnly
                                  />
                                </div>
                              </td>
                              <td width={"20%"}>
                                <p>"{item.review}"</p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
