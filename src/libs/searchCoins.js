import axios from "axios";

export const searchCoins = async (query) => {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/search`, {
    params: { query },
  });
  return data.coins;
};
