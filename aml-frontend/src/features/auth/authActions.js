import API from "../../services/api";
import {jwtDecode} from "jwt-decode";
import { loginStart,loginSuccess,loginFailure } from "./authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await API.post("api/auth/login", credentials);

    const { token, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role",role);

    const decoded = jwtDecode(token);
    console.log("token: ", decoded);

    dispatch(
      loginSuccess({
        token,
        user: decoded.id,
        role: decoded.role,
      })
    );
  } catch (error) {
    dispatch(
      loginFailure(
        error.response?.data?.message || "Login failed"
      )
    );
  }
};