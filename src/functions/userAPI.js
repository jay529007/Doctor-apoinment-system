import api from "./api";

export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    if (!res.data) {
      throw new Error("No data received from server");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server response:", error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const res = await api.post("/users", userData);
    if (!res.data) {
      throw new Error("No data received from server");
    }
    return res.data;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const res = await api.put(`/users/${id}`, updatedData);
    if (!res.data) {
      throw new Error("No data received from server");
    }
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};
