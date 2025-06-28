import React from 'react';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-background">
        <div className="about-us-card">
          <h2 className="about-us-title">About Us</h2>
          <p className="about-us-text">
            Welcome to our Medicomart! We are dedicated to providing quality
            healthcare products and services to our community. Our mission is to
            ensure the health and well-being of our customers by offering a wide
            range of pharmaceutical products and expert advice.
          </p>
          <p className="about-us-text">
            Our team of licensed pharmacists is always ready to assist you with
            your healthcare needs. Thank you for choosing us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
