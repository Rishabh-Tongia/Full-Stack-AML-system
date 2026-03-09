import API from "./api";

export const getAnalystCases = async () => {
  const res = await API.get("/api/analyst/cases");
  return res.data;
};