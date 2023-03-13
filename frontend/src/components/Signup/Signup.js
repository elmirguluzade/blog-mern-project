/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "../Login/Login.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({});
  const [fetch, setFetch] = useState(false);
  const [passColor, setPassColor] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [passResetVisible, setPassResetVisible] = useState(false);
  const [passResetColor, setPassResetColor] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (password.length > 0) setPassColor("red");
    if (password.length === 0) setPassColor("");
    if (password.length > 8) setPassColor("green");
  }, [password]);

  useEffect(() => {
    if (confirmPassword.length > 0) setPassResetColor("red");
    if (confirmPassword.length === 0) setPassResetColor("");
    if (confirmPassword.length > 8) setPassResetColor("green");
  }, [confirmPassword]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/signup", data)
      .then(() => {
        toast.success("Redirecting to login page..", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        if (err.response.data.message === "Email need unique") {
          toast.error("This email was used", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  }, [fetch]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter all information", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const emailFormat = validateEmail(email);
    if (!emailFormat) {
      toast.error("Email is not correct format", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (password < 8 || confirmPassword < 8) {
      toast.error("Passwords must be more than 8", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords are not same", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setData({ name, email, password, confirmPassword });
    if (password === confirmPassword) {
      setFetch(!fetch);
    }
  };

  return (
    <main className="loginContainer">
      <div className="login">
        <h2>Sign Up</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input
              className="text"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="name">Username</label>
          </div>
          <div className="input">
            <input
              className="text"
              type="text"
              id="emailSign"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="emailSign">Email</label>
          </div>
          <div className="input">
            <input
              style={
                passColor === "red"
                  ? { border: "1px solid red" }
                  : passColor === "green"
                  ? { border: "1px solid green" }
                  : { border: "1px solid #ccc" }
              }
              className="text"
              type={!passVisible ? "password" : "text"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            <p className="icon" onClick={() => setPassVisible(!passVisible)}>
              {!passVisible ? <FaEye /> : <FaEyeSlash />}
            </p>
          </div>
          <div className="input">
            <input
              style={
                passResetColor === "red"
                  ? { border: "1px solid red" }
                  : passResetColor === "green"
                  ? { border: "1px solid green" }
                  : { border: "1px solid #ccc" }
              }
              className="text"
              type={!passVisible ? "password" : "text"}
              id="passwordConfirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="passwordConfirm">Confirm password</label>
            <p
              className="icon"
              onClick={() => setPassResetVisible(!passResetVisible)}
            >
              {!passResetVisible ? <FaEye /> : <FaEyeSlash />}
            </p>
          </div>
          <button type="submit" className="submitBtn">
            Sign Up
          </button>
        </form>
        <ToastContainer />
        <p className="notMember">
          Already member?{" "}
          <NavLink className={"toSign"} to="/login">
            Login
          </NavLink>{" "}
        </p>
      </div>
    </main>
  );
};

export default Signup;
