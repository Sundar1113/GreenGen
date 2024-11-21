import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./myOrder.css";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const Order = () => {
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/MyOrder/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setData(json.order);
      } catch (error) {
        console.log(error.message);
      }
    };

    getOrders();
  }, []);

  //Cancel Order
  const onCancel = (index) => {
    Swal.fire({
      title: "cancel this Order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3bb77e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        onRemoveOne(index);
      }
    });
  }; //
  const onRemoveOne = async (index) => {
    try {
      const response = await fetch(`${BASE_URL}/api/myOrder/cancel/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      setData(json.orders);
      if (json.success) {
        Swal.fire({
          icon: "success",
          title: "Order Cancel",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onInfo = (index) => {
    const text =
      `<div>Name - ${data[index].farmer_name}</div>` +
      `<div>PH no. - ${data[index].farmer_ph}</div>`;
    Swal.fire({
      title: "Seller Details",
      html: text,
    });
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
                  <h1 className="hd mb-0 cart_head">My Orders</h1>
                  <p className="cart_head_sub">Check Your Order List Here</p>
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
                        <th className="row_center">Seller</th>
                        <th className="row_center">OTP/Code</th>
                        <th className="row_center">Status</th>
                        <th className="row_center">Cancel</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.length !== 0 &&
                        data?.map(
                          (item, index) =>
                            item.status !== "delivered" && (
                              <tr>
                                <td width={"50%"}>
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

                                <td align="center">
                                  <button
                                    type="button"
                                    class="btn btn-outline-info"
                                    onClick={() => {
                                      onInfo(index);
                                    }}
                                  >
                                    Info
                                  </button>
                                </td>
                                <td width="20%" align="center">
                                  <p>{item.OTP}</p>
                                </td>

                                <td align="center" width="20%">
                                  {item.status === "pending" ? (
                                    <div>
                                      <span className="text-g status status_pending">
                                        {item.status.toUpperCase()}
                                      </span>
                                    </div>
                                  ) : item.status === "processing" ? (
                                    <p className="text-g status status_processing">
                                      {item.status.toUpperCase()}
                                    </p>
                                  ) : item.status === "shipped" ? (
                                    <span className="status status_shipped text-g">
                                      {item.status.toUpperCase()}
                                    </span>
                                  ) : (
                                    <span className="status text-g">
                                      {item.status.toUpperCase()}
                                    </span>
                                  )}
                                </td>
                                {item.status !== "delivered" &&
                                item.status !== "shipped" ? (
                                  <td align="center">
                                    <button
                                      type="button"
                                      class="btn btn-outline-danger"
                                      onClick={() => onCancel(index)}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                ) : (
                                  <td align="center"></td>
                                )}
                              </tr>
                            )
                        )}
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

export default Order;
