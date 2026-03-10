import api from "@/api/axios";

/* -------------------------------
   SUBMIT CONTACT MESSAGE
-------------------------------- */
export const submitContactMessage = async (payload) => {
  const res = await api.post("/contact", payload);
  return res.data;
};