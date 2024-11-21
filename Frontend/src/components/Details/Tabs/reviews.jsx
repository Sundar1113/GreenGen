import React from "react";
import { useState } from "react";
import "../details.css";

import Rating from "@mui/material/Rating";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const Reviews = (props) => {
  const data = props.data;

  return (
    <div className="tabContent">
      <div className="row">
        <div className="col-md-4 pl-5 reviewBox">
          <h4>Customer reviews</h4>

          <div className="d-flex align-items-center mt-2">
            <Rating
              name="half-rating-read"
              defaultValue={2}
              precision={0.5}
              readOnly
            />
            <strong className="ml-3">{data.rating} out of 5</strong>
          </div>

          <br />

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">5 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "75%", height: "20px" }}
              >
                75%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">4 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "50%", height: "20px" }}
              >
                50%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">3 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "55%", height: "20px" }}
              >
                55%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">2 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "35%", height: "20px" }}
              >
                35%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">1 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "25%", height: "20px" }}
              >
                25%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
