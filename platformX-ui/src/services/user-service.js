import axios from "axios";
import { BaseConfig } from "../baseConfig";

const apiClient = axios.create({
  baseURL: BaseConfig.userApiEndPoint,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserById = async (email) => {
  try {
    const response = await apiClient.get(`/${email}`);
    return response;
  } catch (error) {
    console.error("Error fetching example data:", error);
    throw error;
  }
};

export const fetchProfilePhoto = async (accesstoken) => {
  try {
    return await axios
      .get("https://graph.microsoft.com/v1.0/me/photo/$value", {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        responseType: "blob",
      })
      .then((o) => {
        const url = window.URL || window.webkitURL;
        return url.createObjectURL(o.data);
      });
  } catch (error) {
    console.error(error);
  }
};

export const fetchProfile = async (token) => {
  try {
    let profileData = JSON.parse(sessionStorage.getItem("profileData"));
    if (!profileData) {
      const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      profileData = response.data;
      sessionStorage.setItem("profileData", JSON.stringify(profileData));
      return profileData;
    } else {
      return profileData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserDetails = async (empID, userDetails) => {
  try {
    const response = await apiClient.put(`/${empID}`, userDetails);
    return response;
  } catch (error) {
    console.error("Error Submitting data:", error);
    throw error;
  }
};
