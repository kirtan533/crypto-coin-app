export const searchCoins = async (query) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${query}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("failed to search coins");
  }

  const data = await res.json();
  return data.coins;
};
