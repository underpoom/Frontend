import React, { useState } from "react";
import "./LoginSignup.css";
import { Icon } from "@iconify/react";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import MultipleFileUploader from "../MultipleFileUploader";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign up");
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {action === "Login" ? (
        <div></div>
      ) : (
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        </div>
      )}

      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email ID" />
        </div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          {/* <Icon icon="ic:baseline-factory" width="21" height="16" /> */}
          <input type="text" placeholder="Factory Detail" />
        </div>
      </div>
      <div className="inputs">
        <MultipleFileUploader />
      </div>
      {action === "Sign up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign up");
          }}
        >
          Sign up
        </div>
        <div
          className={action === "Sign up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
