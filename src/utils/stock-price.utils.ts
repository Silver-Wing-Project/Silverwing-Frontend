import { StockPrice } from "@/api/types/StockPrice";
import { formatDateToStringDash } from "@/utils/date-parser.utils";

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
  const formattedStartDate = formatDateToStringDash(startDate);
  const formattedEndDate = formatDateToStringDash(today);

  return {
    startDate: formattedStartDate,
    endDate: formattedEndDate
  };
};
