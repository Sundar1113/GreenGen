import "./hero.css";
import React from "react";

import Slide1 from "../../images/Hero/slider-1.png";
import Slide2 from "../../images/Hero/slider-2.png";

const Hero = (props) => {
  let token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <>
      <section className="homeSlider">
        <div className="container-fluid position-relative">
          <div className="home_slider_Main">
            {role === "farmer" ? (
              <div className="item">
                <img src={Slide1} className="w-100" />
                <div className="info">
                  <h2 class="mb-4">
                    List Your Fresh
                    <br />
                    Vegetables
                  </h2>
                  {token ? (
                    <p>Make Profit</p>
                  ) : (
                    <p>Sign up for listing your product</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="item">
                <img src={Slide2} className="w-100" />
                <div className="info">
                  <h2 class="mb-3">
                    Fresh Vegetables
                    <br />
                    Big discount
                  </h2>
                  {token ? (
                    <p>Get some fresh food</p>
                  ) : (
                    <p>Sign up for get discount</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Hero;
