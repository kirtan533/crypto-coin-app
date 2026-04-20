import axios from "axios";

export const fetchCoins = async (currency, page) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`,
  );
  return data;
};
