


import api from "@/api/axios";

/* ✅ GET ACTIVE PROMOS */
export const fetchActivePromos = async () => {
  const res = await api.get("/promos/active");
  return res.data.data; // returning only promo array
};

/* ✅ WATCH PROMO VIDEO */
export const watchPromoAPI = async (promoId) => {
  const res = await api.get(`/promos/${promoId}/watch`);
  return res.data.data; // returning playback object
};