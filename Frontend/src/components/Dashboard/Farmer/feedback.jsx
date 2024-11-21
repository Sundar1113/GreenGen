import React, { useEffect, useState } from "react";
import "./feedback.css";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";
import User_img from "../../../data//user_img.png";
import BASE_URL from "../../../Server/base_url";

const Feedback = () => {
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/feedback/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        console.log(json.feedback);
        setData(json.feedback);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row inventory_body">
            <div className="">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0 cart_head">Feedbacks</h1>
                  <p className="cart_head_sub">
                    There are <span className="text-g">{data.length}</span>
                    &nbsp; Review Of Your Product
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
                        <th className="row_center">Review</th>
                        <th className="row_center">Product Details</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length !== 0 &&
                        data.map((item, index) => {
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
                                    <div className="d-flex align-items-center w-100  rating_show">
                                      <Rating
                                        className="review_rating"
                                        name="half-rating-read"
                                        value={item.rating}
                                        precision={0.5}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td width="10%" align="center">
                                <h5 className="text-dark">
                                  {new Date(item.date).toLocaleDateString()}
                                </h5>
                              </td>

                              <td align="center" width="20%">
                                <p>"{item.review}"</p>
                              </td>
                              <td width={"20%"}>
                                <div className="get_elements_center">
                                  <div className="info pl-4 get_elements_center">
                                    <h4>{item.product_name}</h4>

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
