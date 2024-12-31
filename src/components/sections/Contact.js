import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../../styles/Contact.css";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormSubmitted(true);
          setErrorMessage("");
        },
        (error) => {
          console.error(error.text);
          setErrorMessage("Failed to send message. Please try again later.");
        }
      );

    e.target.reset(); // Clear the form after submission
  };

  return (
    <section id="contact" className="contact-section">
      <h1 className="section-title">Contact Me</h1>
      <p className="contact-text">
        I'd love to hear from you! Feel free to reach out via email, or connect with me on social media.
      </p>

      <div className="contact-details">
        <div className="contact-item">
          <h2>Email</h2>
          <a href="mailto:carson@carsongodwin.com" className="contact-link">
            carson@carsongodwin.com
          </a>
        </div>

        <div className="contact-item">
          <h2>Social Media</h2>
          <div className="social-links">
            <a href="https://github.com/CarsonGodwin" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/material-outlined/48/github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/carson-godwin/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/material-outlined/48/linkedin.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={sendEmail}>
        <h2>Send a Message</h2>
        {formSubmitted && <p className="form-success">Thank you! Your message has been sent successfully.</p>}
        {errorMessage && <p className="form-error">{errorMessage}</p>}
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
