import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const storedToken = localStorage.getItem("token");

let storedUser = null;
let storedRole = null;

if (storedToken) {
  const decoded = jwtDecode(storedToken);
  storedUser = decoded.id;
  storedRole = decoded.role;
}

const initialState = {
  user: storedUser,
  token: storedToken,
  role: storedRole,
  isLoading: false,
  error: null,
};

//reducer
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;