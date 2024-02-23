import React, { useState } from "react";
import axios from "axios";
import "./MultipleFileUploader.css";

const MultipleFileUploader = () => {
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
      console.log("Files uploaded successfully:", response.data);
      setUploadedFiles(response.data.files || []); // Ensure uploadedFiles is always an array
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
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

        <button type="submit">Upload</button>
      </form>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          {uploadedFiles.map((file, index) => (
            <img key={index} src={file} alt={`Uploaded content ${index}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default MultipleFileUploader;
