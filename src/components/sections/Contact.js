import React from "react";
import "../../styles/Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h1 className="section-title">Contact Me</h1>
      <p className="contact-text">I'd love to hear from you! Feel free to reach out via email, or connect with me on social media.</p>

      <div className="contact-details">
        <div className="contact-item">
          <h2>Email</h2>
          <a href="mailto:carson@carsongodwin.com" className="contact-link">carson@carsongodwin.com</a>
        </div>


        <div className="contact-item">
          <h2>Social Media</h2>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/material-outlined/48/github.png" alt="GitHub" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/material-outlined/48/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/material-outlined/48/twitter.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>

      <form className="contact-form">
        <h2>Send a Message</h2>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
