import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="container about-body">
      <div className="about-header">About GreenGen</div>

      <div className="about-content">
        <div className="about-card">
          <div className="about-card-img company-logo"></div>
          <p className="about-card-text">
            Company Name: GreenGen Pvt. Ltd.
          </p>
        </div>
        <div className="about-description">
          <h3 className="about-subheader">Our Mission</h3>
          <p>
            At GreenGen, our mission is to revolutionize the agricultural supply
            chain by connecting farmers directly with consumers. We aim to
            provide a platform that ensures fair pricing, transparency, and
            sustainability, promoting the best practices in agriculture.
          </p>

          <h3 className="about-subheader">Our Vision</h3>
          <p>
            We envision a world where every farmer has direct access to the
            marketplace, and every consumer has access to fresh, locally sourced
            produce. We strive to eliminate middlemen, reduce food wastage, and
            ensure that the benefits of the agricultural trade reach those who
            deserve them the most – the farmers.
          </p>

          <h3 className="about-subheader">Our Values</h3>
          <p>
            <strong>Integrity:</strong> We believe in doing the right thing, always.
            <br />
            <strong>Transparency:</strong> We maintain openness and clarity in our operations.
            <br />
            <strong>Sustainability:</strong> We are committed to sustainable practices that benefit the environment and society.
            <br />
            <strong>Innovation:</strong> We continuously seek new ways to improve the agricultural supply chain.
          </p>

          <h3 className="about-subheader">Our Story</h3>
          <p>
            Founded by a group of technology enthusiasts and agricultural
            experts, GreenGen was born out of the need to address the challenges
            faced by farmers and consumers in the traditional market system. With
            a passion for innovation and a commitment to social impact, our team
            has created a platform that empowers farmers and provides consumers
            with fresh, high-quality produce.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
