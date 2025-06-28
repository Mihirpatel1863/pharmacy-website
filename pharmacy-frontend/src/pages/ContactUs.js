import React from 'react';
import './ContactUs.css';  

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-background"></div>  
      <div className="contact-us-card">
        <h2 className="contact-us-title">Contact Us</h2>
        <p className="contact-us-text">
          If you have any questions or concerns, please feel free to reach out to us.
        </p>
        <p className="contact-us-text">Email: support@Medicomart.com</p>
        <p className="contact-us-text">Phone: (123) 456-7890</p>
        <p className="contact-us-text">
          Visit us at: <br />
          123 Medicomart., <br />
          Health City, AHMD 35963
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
