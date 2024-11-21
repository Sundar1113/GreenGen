import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./inventory.css";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const Inventory_edit = (props) => {
  let token = localStorage.getItem("token");
  const item = props.item;
  const [price, setPrice] = useState(item.price);
  const [addStock, setAddStock] = useState(0);

  const onAddStockChange = (e) => {
    setAddStock(e.target.value);
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onChangePrice = (id) => {
    const Price = parseInt(price);
    if (Price <= 0 || Price > 1000000) {
      Swal.fire("Enter A Valid Price!");
    } else if (Price === item.price) {
      Swal.fire("Its a Same Price!");
    } else {
      Swal.fire({
        title: "Change This Price?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3bb77e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          changePrice(id, Price);
        }
      });
    }
  };
  const changePrice = async (id, Price) => {
    try {
      const response = await fetch(`${BASE_URL}/api/inventory/changePrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          id: id,
          price: Price,
        }),
      });
      const json = await response.json();
      if (json.success) {
        props.getItems();
        Swal.fire({
          icon: "success",
          title: "Change Price Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onAddStock = (id) => {
    const stock = parseInt(addStock);
    if (stock <= 0 || stock > 1000) {
      Swal.fire("Enter A Valid stock!");
    } else {
      Swal.fire({
        title: "Add This Amount Of Stock?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3bb77e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          AddStock(id, stock);
        }
      });
    }
  };
  const AddStock = async (id, stock) => {
    try {
      const response = await fetch(`${BASE_URL}/api/inventory/addStock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          id: id,
          quantity: stock,
        }),
      });
      const json = await response.json();
      if (json.success) {
        props.getItems();
        Swal.fire({
          icon: "success",
          title: "Stock Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onRemoveStock = (id) => {
    const stock = parseInt(addStock);
    if (stock <= 0 || stock > item.CurQuantity || stock > 1000) {
      Swal.fire("Enter A Valid stock!");
    } else {
      Swal.fire({
        title: "Remove This Amount Of Stock?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3bb77e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          RemoveStock(id, stock);
        }
      });
    }
  };
  const RemoveStock = async (id, stock) => {
    try {
      const response = await fetch(`${BASE_URL}/api/inventory/removeStock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          id: id,
          quantity: stock,
        }),
      });
      const json = await response.json();
      if (json.success) {
        props.getItems();
        Swal.fire({
          icon: "success",
          title: "Stock Remove Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <td width="21%" align="center">
      <div class="input-group mb-1">
        <input
          type="text"
          class="form-control"
          placeholder="RS"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={onPriceChange}
        />

        <button
          type="button"
          class="btn btn-success "
          onClick={() => {
            onChangePrice(item._id);
          }}
        >
          Set Price
        </button>
      </div>
      <div class="input-group mb-1">
        <input
          type="text"
          class="form-control"
          placeholder="KG"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={onAddStockChange}
        />
        <button
          type="button"
          class="btn btn-success "
          onClick={() => {
            onAddStock(item._id);
          }}
        >
          &nbsp;<i class="fa-solid fa-plus"></i>&nbsp;
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            onRemoveStock(item._id);
          }}
        >
          &nbsp;<i class="fa-solid fa-minus"></i>&nbsp;
        </button>
      </div>
    </td>
  );
};

export default Inventory_edit;
