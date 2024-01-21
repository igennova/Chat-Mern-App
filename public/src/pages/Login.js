import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, json, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../assets/logo.svg";
import "./register.css";
import {loginRoute } from "../utils/Apiroute";
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  },[])
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      
      const { username, password } = values;

      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/")
      }
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        
      }
      
    }
  };
  const handleValidation = () => {
    const { username, password } = values;
    
     if (username.length==="") {
      toast.error("Username Required", toastOptions);
      return false;
    } else if (password.length === "") {
      toast.error("Password is Required", toastOptions);
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
            min="3"
          />
         
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlechange}
          />
        
          
          <button type="submit">Log In</button>
          <span>
            Don't have Account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Login;
