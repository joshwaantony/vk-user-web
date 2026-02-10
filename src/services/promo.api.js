import api from "@/api/axios";

export const fetchActivePromos = async () => {
  const res = await api.get("/promos/active");
  return res.data.data; // only promo array
};
