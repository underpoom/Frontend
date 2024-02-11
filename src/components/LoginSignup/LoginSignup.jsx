import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import { Icon } from "@iconify/react";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import MultipleFileUploader from "./MultipleFileUploader";
import { useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const [action, setAction] = useState("Sign up");
  const [provinceNames, setProvinceNames] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const names = data.map((province) => province.name_th);
        setProvinceNames(names);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const navigate = useNavigate();

  function handleClickSignIn(event) {
    navigate("/information");
  }

  return (
    <>
      <div
        className={
          action === "Sign up" ? "background-signup" : "background-login"
        }
      />

      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
          </div>
        </div>

        {action === "Sign up" ? <MultipleFileUploader /> : <div></div>}

        <div className="submit-container">
          {action === "Login" ? (
            <div
              className="submit"
              // onClick={() => {
              //   // setAction("Sign up");
              // }}
              onClick={handleClickSignIn}
            >
              Login
            </div>
          ) : (
            // <div className="submit" onClick={handleClickSignIn}>
            <div className="submit">
              Sign up
            </div>
          )}
        </div>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Already have an account ?{" "}
            <span
              onClick={() => {
                setAction("Login");
              }}
            >
              Login
            </span>
          </div>
        )}

        {action === "Sign up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Don’t have an account ?{" "}
            <span
              onClick={() => {
                setAction("Sign up");
              }}
            >
              Sign up
            </span>
          </div>
        )}

        {/* <LoadAddress/> */}
      </div>
    </>
  );
};

export default LoginSignup;
