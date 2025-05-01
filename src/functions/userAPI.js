import api from "./api";

// Helper function for retrying API calls
async function fetchWithRetry(fn, retries = 3, delay = 2000) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  throw lastError;
}

export const getUsers = async () => {
  return fetchWithRetry(async () => {
    const res = await api.get("/users");
    if (!res.data) {
      throw new Error("No data received from server");
    }
    return res.data;
  });
};

export const addUser = async (userData) => {
  return fetchWithRetry(async () => {
    const res = await api.post("/users", userData);
    if (!res.data) {
      throw new Error("No data received from server");
    }
    return res.data;
  });
};

export const updateUser = async (id, updatedData) => {
  return fetchWithRetry(async () => {
    const res = await api.put(`/users/${id}`, updatedData);
    if (!res.data) {
      throw new Error("No data received from server");
    }
    return res.data;
  });
};

export const deleteUser = async (id) => {
  return fetchWithRetry(async () => {
    await api.delete(`/users/${id}`);
  });
};
