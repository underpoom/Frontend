export const url = "http://127.0.0.1:8000";

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { UserContext, url } from "../../bounding/UserContext";
// const { user } = useContext(UserContext);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${url}/get_factory_info?facto_id=${factoryData.factory_id}`,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//               Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log("successful:", response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);