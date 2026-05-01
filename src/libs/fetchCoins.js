export const fetchCoins = async (currency, page) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}&per_page=20`,
    {
      next: { revalidate: 60 }, //cache for 60 sec
    },
  );
  return res.json();
};
