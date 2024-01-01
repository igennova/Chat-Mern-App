import React, { Fragment,useState,useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.svg"
import "./register.css"
const Register = () => {
  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const handlesubmit = (event) => {
    event.preventDefault();
    alert("form");
  };
  const handlechange = (event) => {
    setValues({...values,[event.target.name]:event.target.value})
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
    </Fragment>
  );
};


export default Register;
