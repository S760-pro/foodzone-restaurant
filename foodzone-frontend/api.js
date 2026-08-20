// Base URL — reads from Vite env, falls back to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Helper: attach Authorization header if token exists ──
const authHeaders = () => {
  const token = localStorage.getItem("fz_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ── Generic request wrapper ──
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: authHeaders(),
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// ── Auth ──
export const authAPI = {
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),

  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),

  getProfile: () => request("/auth/profile"),
};

// ── Rooms ──
export const roomAPI = {
  getAll: () => request("/rooms"),
  getById: (id) => request(`/rooms/${id}`),
  create: (body) =>
    request("/rooms", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/rooms/${id}`, { method: "DELETE" }),
};

// ── Tables ──
export const tableAPI = {
  getAll: () => request("/tables"),
  create: (body) =>
    request("/tables", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/tables/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/tables/${id}`, { method: "DELETE" }),
};

// ── Menu ──
export const menuAPI = {
  getAll: () => request("/menu"),
  create: (body) =>
    request("/menu", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/menu/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/menu/${id}`, { method: "DELETE" }),
};

// ── Bookings ──
export const bookingAPI = {
  create: (body) =>
    request("/bookings", { method: "POST", body: JSON.stringify(body) }),
  getMine: () => request("/bookings/my"),
  getAll: () => request("/bookings"),
  updateStatus: (id, status) =>
    request(`/bookings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  cancel: (id) => request(`/bookings/${id}/cancel`, { method: "PUT" }),
};

// ── Orders ──
export const orderAPI = {
  create: (body) =>
    request("/orders", { method: "POST", body: JSON.stringify(body) }),
  getMine: () => request("/orders/my"),
  getAll: () => request("/orders"),
  updateStatus: (id, status) =>
    request(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};

// ── Reviews ──
export const reviewAPI = {
  getAll: () => request("/reviews"),
  create: (body) =>
    request("/reviews", { method: "POST", body: JSON.stringify(body) }),
};

// ── Contact ──
export const contactAPI = {
  create: (body) =>
    request("/contact", { method: "POST", body: JSON.stringify(body) }),
  getAll: () => request("/contact"),
  updateStatus: (id, status) =>
    request(`/contact/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};
