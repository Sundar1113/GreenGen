import React from "react";
import "./top.css";

function top(props) {
  const name = props.name;
  return (
    <>
      <div className="container top_body">
        <h2 className="top_heading">{name}</h2>
      </div>
    </>
  );
}

export default top;
