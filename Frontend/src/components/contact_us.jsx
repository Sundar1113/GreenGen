import React, { useRef } from "react";
import "../styles/contact_us.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4w92gwl",
        "template_3fueuke",
        form.current,
        "Xo2LfNQJlzLI6-zKe"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Message Sent",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container contact-us-body">
      {/* icons */}
      <div className="footer-icons">
        <a
          href="https://github.com/Sundar1113"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.instagram.com/sundar_0309"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/sundara-vinayagam-v199626"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://www.facebook.com/Sundar_0309"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
      </div>

      {/* Form */}
      <div className="form-container">
        <p className="title">Contact Us</p>
        <form className="form" ref={form} onSubmit={sendEmail}>
          <div className="input-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name="user_name"
              id="username"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="user_email"
              id="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              className="message"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <input className="submit-button" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
