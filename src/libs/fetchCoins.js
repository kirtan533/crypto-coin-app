import axios from "axios";

export const fetchCoins = async (currency, page, search) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    {
      params: {
        vs_currency: currency,
        page: page,
        per_page: 20,
        ids: search || undefined,
      },
    },
  );
  return data;
};
