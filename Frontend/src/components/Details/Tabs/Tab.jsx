import React from "react";
import "../details.css";
import Review from "./reviews.jsx";
import FeedBack from "./feedback.jsx";
import Info from "./add.jsx";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { useState } from "react";
import { Button } from "@mui/material";

const DetailTab = (props) => {
  const data = props.data;
  const [activeTabs, setActiveTabs] = useState(2);
  return (
    <div className="container mt-5 p-5 detailsPageTabs">
      <div className="customTabs">
        <ul className="list list-inline">
          <li className="list-inline-item">
            <Button
              className={`${activeTabs === 0 && "active"}`}
              onClick={() => {
                setActiveTabs(0);
              }}
            >
              Description
            </Button>
          </li>
          <li className="list-inline-item">
            <Button
              className={`${activeTabs === 1 && "active"}`}
              onClick={() => {
                setActiveTabs(1);
              }}
            >
              Additional info
            </Button>
          </li>
          <li className="list-inline-item">
            <Button
              className={`${activeTabs === 2 && "active"}`}
              onClick={() => {
                setActiveTabs(2);
                // showReviews();
              }}
            >
              Reviews ({data.feedback.length})
            </Button>
          </li>
        </ul>

        <br />
        {activeTabs === 0 && (
          <div className="tabContent">
            <p>{data.description}</p>
          </div>
        )}
        {activeTabs === 1 && <Info data={data} />}
        {activeTabs === 2 && <FeedBack data={data.feedback} />}
      </div>
    </div>
  );
};

export default DetailTab;
