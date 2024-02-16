import React, { useState } from "react";
import axios from "axios";
import "./MultipleFileUploader.css";

export const MultipleFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleMultipleChange(event) {
    setFiles([...event.target.files]);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFiles";
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setUploadedFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }

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
                    ? file.name.substring(0, 12) + "..."
                    : file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      <div className="uploaded-files">
        {uploadedFiles.map((file, index) => (
          <img key={index} src={file} alt={`Uploaded content ${index}`} />
        ))}
      </div>
    </>
  );
};

export default MultipleFileUploader;
