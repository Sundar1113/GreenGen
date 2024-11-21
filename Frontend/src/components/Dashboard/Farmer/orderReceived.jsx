import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orderReceived.css";
import Swal from "sweetalert2";
import Status from "./order_status.jsx";
import BASE_URL from "../../../Server/base_url";

const Order = () => {
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/orderReceived/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setData(json.orders);
      } catch (error) {
        console.log(error.message);
      }
    };

    getOrders();
  }, []);
  const getOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orderReceived/show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      setData(json.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Cancel Order

  const onInfo = (index, status) => {
    console.log(status);
    const text =
      `<div>Name - ${data[index].buyer_name}</div>` +
      `<div>State - ${data[index].buyer_address.state}</div>` +
      `<div>City - ${data[index].buyer_address.city}</div>` +
      `<div>Pin - ${data[index].buyer_address.pin}</div>` +
      `<div>PH no. - ${data[index].buyer_ph}</div>`;
    Swal.fire({
      title: "Buyer Details",
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
                  <h1 className="hd mb-0 cart_head">Orders Received</h1>
                  <p className="cart_head_sub">
                    Check Your Order Received List Here
                  </p>
                </div>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="row_center">Buyer</th>
                        <th className="row_center">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length !== 0 &&
                        data.map(
                          (item, index) =>
                            item.status !== "delivered" && (
                              <tr key={index}>
                                <td width={"50%"}>
                                  <div className="d-flex align-items-center">
                                    <div className="img">
                                      <Link>
                                        <img
                                          src={
                                            item.image + "?im=Resize=(100,100)"
                                          }
                                          className="w-100"
                                          alt={item.productName} // Add alt attribute for accessibility
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
                                    className="btn btn-outline-info"
                                    onClick={() => {
                                      onInfo(index, item);
                                    }}
                                  >
                                    Info
                                  </button>
                                </td>

                                <Status
                                  key={index}
                                  data={item}
                                  getOrders={getOrders}
                                />
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
