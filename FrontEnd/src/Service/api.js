import axios from "axios";

const url = "http://localhost:8080";

// Function to create a car
export const createCarRegistration = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve your JWT token from local storage
    const response = await axios.post(
      `${url}/api/carRegistration/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    return response.data; // Return the actual response data
  } catch (error) {
    console.error("Error creating car:", error);
    throw new Error(
      `Failed to create car: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to get user cars
export const getCarRegistration = async () => {
  try {
    const response = await axios.get(`${url}/api/carRegistration/carslookbook`);
    return response.data; // Return response data
  } catch (error) {
    console.error("Error getting cars:", error);
    throw new Error(
      `Failed to get cars: ${error.response?.data?.message || error.message}`
    );
  }
};

// get car of all users
export const getCarRegistrationAll = async () => {
  try {
    const response = await axios.get(`${url}/api/carRegistration/all`);
    return response.data; // Return response data
  } catch (error) {
    console.error("Error getting cars:", error);
    throw new Error(
      `Failed to get cars: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to delete a car by ID
export const deleteCarRegistration = async (id) => {
  try {
    console.log("Deleting car with ID:", id);
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.delete(`${url}/api/carRegistration/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    return response.data; // Return response data
  } catch (error) {
    console.error("Error deleting car:", error);
    throw new Error(
      `Failed to delete car: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to place a new bid
export const placeBid = async (carId, bidAmount) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${url}/api/bids/placebid`,
      {
        carId,
        bidValue: bidAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(carId,bidAmount);
    return response.data;
  } catch (error) {
    console.error("Error placing bid in API:", error.message);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

//here implement selectbid
export const selectBid = async (carId, bidId) => {
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.put(
      `${url}/api/bids/acceptbid`, // Adjust this URL based on your API structure
      { bidId, carId },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error selecting bid:", error);
    throw new Error(
      `Failed to select bid: ${error.response?.data?.message || error.message}`
    );
  }
};

export const getAcceptedBids = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. User might not be logged in.");
    }

    const response = await axios.get(`${url}/api/bids/accepted`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching accepted bids:", error);
    throw new Error(
      `Failed to get accepted bids: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve your JWT token from local storage
    const response = await axios.get(`${url}/userprofile/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("Request Reached")
    return response.data; // Return the actual response data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error(
      `Failed to get user profile: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to update user profile
export const updateUserProfile = async (updatedData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve your JWT token from local storage
    const response = await axios.put(
      `${url}/userprofile/`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data; // Return the updated profile data
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error(
      `Failed to update user profile: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to update user password
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve your JWT token from local storage
    const response = await axios.put(
      `${url}/userprofile`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    console.log("Update password");
    return response.data; // Return success message or status
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error(
      `Failed to update password: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to upload user avatar
export const uploadAvatar = async (avatarData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve your JWT token from local storage
    const formData = new FormData();
    formData.append("avatar", avatarData); // Append the avatar file to FormData

    const response = await axios.post(`${url}/userprofile/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Return success or the updated avatar URL
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw new Error(
      `Failed to upload avatar: ${error.response?.data?.message || error.message}`
    );
  }
};

// Function to delete user profile
export const deleteUserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve your JWT token from local storage
    const response = await axios.delete(`${url}/userprofile/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("User delete api")
    return response.data; // Return success message or status
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw new Error(
      `Failed to delete user profile: ${error.response?.data?.message || error.message}`
    );
  }
};
