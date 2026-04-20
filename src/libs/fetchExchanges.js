import axios from "axios";

export const fetchExchanges = async () => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/exchanges`,
  );
  return data;
};
