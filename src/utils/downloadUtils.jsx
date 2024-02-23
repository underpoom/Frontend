import axios from "axios";

export const handleDownload = async (user) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/get_verification_file",
      {
        username: user.username,
      },
      {
        responseType: "blob",
      }
    );

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${user.username}_verification.jpg`);
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
