import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../assets/logo.svg";
import  classes  from "./register.module.css"; // Adjusted import
import { loginRoute } from "../utils/Apiroute";

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

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;

      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        } else if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An unexpected error occurred", toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (username.trim() === "") {
      toast.error("Username is required", toastOptions);
      return false;
    } else if (password.trim() === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Fragment>
      <div className={classes.formcontainer}> {/* Changed class name */}
        <form onSubmit={handleSubmit} className={classes.registerform}>
          <div className={classes.brand}> {/* Changed class name */}
            <img src={Logo} alt="Logo"></img>
            <h1>SONIC</h1>
          </div>

          <input
          className={classes.registerinput}
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            minLength="3"
          />

          <input
          className={classes.registerinput}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <button type="submit" className={classes.registerbutton }>Log In</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Login;
