import API from "./api";

export const getAllCases = async () => {
  const response = await API.get("/api/admin/cases");
  return response.data;
};