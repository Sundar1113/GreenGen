import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orderHistory.css";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const History = () => {
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/history/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        console.log(json.history);
        setData(json.history);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const onHome = () => {
    navigate("/");
  };
  const onReview = (data) => {
    console.log(data);
    navigate("/addReview", { state: { data: data } });
  };

  return (
    <>
      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row inventory_body">
            <div className="">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0 cart_head">Order History</h1>
                  <p className="cart_head_sub">
                    There are <span className="text-g">{data.length}</span> item
                    in your order history
                  </p>
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
                        <th className="row_center">Rate Product</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length !== 0 &&
                        [...data].reverse().map((item, index) => {
                          return (
                            <tr>
                              <td width={"40%"}>
                                <div className="d-flex align-items-center">
                                  <div className="img">
                                    <Link>
                                      <img
                                        src={
                                          item.image + "?im=Resize=(100,100)"
                                        }
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
                              <td align="center" width="30%">
                                {item.feedback_done === false ? (
                                  <button
                                    type="button"
                                    class="btn btn-outline-primary"
                                    onClick={() => onReview(item)}
                                  >
                                    Review
                                  </button>
                                ) : (
                                  <span className="text-g status status_delivered">
                                    DONE
                                  </span>
                                )}
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

export default History;
