import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, json, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../assets/logo.svg";
import "./register.css";
import { registerRoute } from "../utils/Apiroute";
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      
      const { username, password, email } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        navigate("/")
      }
    }
  };
  const handleValidation = () => {
    const { username, password, confirmPassword, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password  and confirm password should be same",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("username should be greater than 3 words", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 words", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is Required", toastOptions);
      return false;
    }
    return true;
  };
  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <Fragment>
      <div className="formcontainer">
        <form onSubmit={handlesubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo"></img>
            <h1>SONIC</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handlechange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handlechange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlechange}
          />
          <input
            type="password"
            placeholder=" Confirm password"
            name="confirmPassword"
            onChange={handlechange}
          />
          <button type="submit">CREATE NEW USER</button>
          <span>
            Already have a id <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Register;
