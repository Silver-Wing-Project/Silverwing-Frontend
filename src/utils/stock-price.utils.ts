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

export const formatDateForApi = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  // Use standard ISO format for API calls
  return `${year}-${month}-${day}`;
};

export const createRecentDateRange = (daysBack: number = 7) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysBack);
  const formattedStartDate = formatDateForApi(startDate);
  const formattedEndDate = formatDateForApi(today);

  return {
    startDate: formattedStartDate,
    endDate: formattedEndDate
  };
};
