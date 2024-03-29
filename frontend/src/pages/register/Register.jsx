import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    // Add other registration fields here
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const registrationData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      country: formData.country,
      city: formData.city,
      phone: formData.phone
      // Other registration fields
    };

    try {
      const response = await axios.post("http://localhost:8800/api/auth/register", registrationData);

      if (response.status === 200) {
        console.log("Registration successful!");
        navigate("/login"); // Navigate to the login page
      } else {
        console.error("Registration failed.....");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="registration">
      <div className="lContainer">
        <div className="formColumn">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Country"
            id="country"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Phone"
            id="phone"
            onChange={handleChange}
            className="lInput"
          />
          <button onClick={handleClick} className="lButton">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
