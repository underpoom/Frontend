import React, { useContext, useState } from "react";
import "./LoginSignup.css";
import { Icon } from "@iconify/react";
import user_icon from "../../bounding/Assets/person.png";
import email_icon from "../../bounding/Assets/email.png";
import password_icon from "../../bounding/Assets/password.png";
import MultipleFileUploader from "./MultipleFileUploader";
import { useNavigate } from "react-router-dom";
import "./MultipleFileUploader.css";
import axios from "axios";
import { UserContext } from "../../bounding/UserContext";

const url = "http://127.0.0.1:8000";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [path, setPath] = useState("");
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (path) => {
    try {
      const response = await axios.post(`${url}/sign_up`, {
        firstname: name,
        surname: lastName,
        email: email,
        username: username,
        password: password,
        verified_file_path: path,
      });
      console.log("Sign up successful:", response.data);

      login(username);


      // navigate("/userhomepage");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${url}/login_token`,
        {
          grant_type: "",
          username: username,
          password: password,
          scope: "",
          client_id: "",
          client_secret: "",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Login successful:", response.data);
      navigate("/userhomepage");
      login(username);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleMultipleChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleMultipleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:8000/upload_user_file";
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      });
      // console.log("Files uploaded successfully:", response.data);
      setPath(response.data);
      handleSignUp(response.data.path);
      setUploadedFiles(response.data.files || []); // Ensure uploadedFiles is always an array
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

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

        {action === "Sign up" && (
          <>
            <div className="inputs-name-lastname">
              <div className="input-name-lastname">
                {/* <img src={user_icon} alt="" /> */}
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-name-lastname">
                {/* <img src={user_icon} alt="" /> */}
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="inputs">
              <div className="input">
                {/* <img src={user_icon} alt="" /> */}
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div className="inputs">
          <div className="input">
            {/* <img src={user_icon} alt="" /> */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            {/* <img src={password_icon} alt="" /> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* show file */}
        {action === "Sign up" && (
          <>
            <form className="input-container" onSubmit={handleMultipleSubmit}>
              <label>
                Choose files
                <input type="file" multiple onChange={handleMultipleChange} />
              </label>

              {files.length > 0 && (
                <div className="selected-files">
                  <h3>Selected Files:</h3>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>
                        {file.name.length > 12
                          ? `${file.name.substring(0, 12)}...`
                          : file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>

            {uploadedFiles.length > 0 && (
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Uploaded content ${index}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="submit-container">
          {action === "Login" ? (
            <div className="submit" onClick={handleLogin}>
              Login
            </div>
          ) : (
            <div className="submit" onClick={handleMultipleSubmit}>
              Sign up
            </div>
          )}
        </div>

        {action === "Sign up" && (
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

        {action === "Login" && (
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
      </div>
    </>
  );
};

export default LoginSignup;
