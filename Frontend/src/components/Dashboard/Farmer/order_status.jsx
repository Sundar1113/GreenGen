import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orderReceived.css";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const Order_status = (props) => {
  const item = props.data;
  let token = localStorage.getItem("token");
  const [Status, setStatus] = useState(item.status);

  const onStatus = async (id, status) => {
    if (status === "processing") {
      Swal.fire({
        title: `Product is shipped?`,
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          updateStatus(id, status);
        }
      });
    } else if (status === "shipped") {
      const { value: OTP } = await Swal.fire({
        title: "Delivery Done?",
        input: "number",
        inputLabel: "Enter 6-Digit OTP",
        inputPlaceholder: "_ _ _ _ _ _",
        inputAttributes: {
          style: "text-align: center;", // Center-align the entered text
        },
        customClass: {
          input: "center-text", // Apply custom CSS class to input
        },
        allowOutsideClick: false, // Prevent closing the modal when clicking outside
        showCancelButton: true,
        cancelButtonText: "Cancel",
      });

      if (OTP !== undefined && OTP.toString().length === 6) {
        updateStatus(id, status, OTP);
      } else {
        Swal.fire({
          icon: "error",
          title: "ENTER VALID OTP",
        });
      }
    } else {
      updateStatus(id, status);
    }
  };

  const updateStatus = async (id, status, OTP) => {
    try {
      const response = await fetch(`${BASE_URL}/api/orderReceived/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          id: id,
          status: status,
          OTP: OTP,
        }),
      });
      const json = await response.json();
      if (json.success) {
        console.log(json.status);
        setStatus(json.status);
        props.getOrders();
        Swal.fire({
          icon: "success",
          title: `Order ${json.status} `,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ENTER VALID OTP",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
      props.getOrders();
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
  return (
    <>
      {Status === "pending" ? (
        <>
          <td align="center" width="30%">
            <div className="pending_btn_op">
              <button
                type="button"
                class="btn btn-outline-success pending_btn_main"
                onClick={() => onStatus(item._id, Status)}
              >
                Accept &nbsp;<i class="fa-solid fa-check"></i>
              </button>

              <button
                type="button"
                class="btn btn-outline-danger pending_btn_main"
                onClick={() => onCancel(item._id)}
              >
                Cancel &nbsp;<i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </td>
        </>
      ) : Status === "processing" ? (
        <td align="center" width="30%">
          <button
            type="button"
            class="btn btn-outline-warning"
            onClick={() => onStatus(item._id, Status)}
          >
            {item.status.toUpperCase()}&nbsp;
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </td>
      ) : Status === "shipped" ? (
        <td align="center" width="30%">
          <button
            type="button"
            class="btn btn btn-outline-success"
            onClick={() => onStatus(item._id, Status)}
          >
            {item.status.toUpperCase()}&nbsp;
            <i class="fa-solid fa-truck-fast"></i>
          </button>
        </td>
      ) : (
        <td align="center" width="30%">
          <p className="status_delivered">
            {item.status.toUpperCase()}&nbsp;
            <i class="fa-solid fa-check-double"></i>
          </p>
        </td>
      )}
    </>
  );
};

export default Order_status;
