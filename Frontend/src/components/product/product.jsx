import React from "react";
import Card from "./product_card.jsx";

function product(props) {
  const data = props.data;
  const cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(
      <div key={i} className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
        <Card data={data[i]} />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="product row">{cards}</div>
    </div>
  );
}

export default product;
