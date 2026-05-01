export const fetchCoinDetails = async (id) => {
  if (!id) {
    throw new Error("Invalid coin id");
  }

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Coin not found");
    }
    if (res.status === 429) {
      throw new Error("Too many requests");
    }
    throw new Error("Failed to fetch coin details");
  }

  return res.json();
};
