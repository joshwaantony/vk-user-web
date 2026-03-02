import api from "@/api/axios";

/* ----------------------------------------
   GET MY ENROLLMENTS
----------------------------------------- */
export const getMyEnrollments = async () => {
  const response = await api.get("/enrollments/me");
  return response.data;
};