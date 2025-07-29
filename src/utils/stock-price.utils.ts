import { StockPrice } from "@/api/types/StockPrice";

export const sortStockPricesByDate = (
  stockPrices: StockPrice[]
): StockPrice[] => {
  return [...stockPrices].sort((a: StockPrice, b: StockPrice) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const getMostRecentStockPrice = (
  stockPrices: StockPrice[]
): StockPrice | null => {
  if (!stockPrices || stockPrices.length === 0) return null;

  const sortedPrices = sortStockPricesByDate(stockPrices);
  return sortedPrices[0];
};

export const createRecentDateRange = (daysBack: number = 7) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysBack);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  };
};
