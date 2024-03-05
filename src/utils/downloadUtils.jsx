import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext, url } from "../bounding/UserContext";

export const handleDownload = async (userData, userToken) => {
  console.log(userToken);
  try {
    const response = await axios.post(
      `${url}/get_verification_file`,
      {
        username: userData.username,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        responseType: "blob",
      }
    );

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${userData.username}_verification.jpg`);
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
