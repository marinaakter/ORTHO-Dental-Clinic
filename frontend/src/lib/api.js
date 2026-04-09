import axios from "axios";

const API_BASE_URL = (
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

export const appointmentApi = {
  create: (payload) => api.post("/appointments", payload),
  list: () => api.get("/appointments"),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  remove: (id) => api.delete(`/appointments/${id}`)
};
