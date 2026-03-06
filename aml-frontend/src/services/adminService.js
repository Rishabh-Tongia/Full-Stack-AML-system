import API from "./api";

export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};