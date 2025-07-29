import { useEffect, useMemo, useState } from "react";
import { StockPrice } from "@/api/types/StockPrice";
import { ApiError } from "@/api/config/api-error";
import { StockPriceService } from "@/api/services/StockPriceService";

export const useStockPrice = (ticker: string) => {
  const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const stockPriceService = useMemo(() => new StockPriceService(), []);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      if (!ticker || ticker.trim().length === 0) {
        setError(new ApiError(400, "Invalid ticker", "Bad Request"));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const latestPrice =
          await stockPriceService.getMostRecentClosingPrice(ticker);

        if (latestPrice) {
          setStockPrice(latestPrice);
        } else {
          setError(
            new ApiError(
              404,
              `No recent stock data found for ${ticker}. Please verify the ticker symbol.`,
              "Not Found"
            )
          );
        }
      } catch (err) {
        console.error(`Failed to fetch stock price for ${ticker}:`, err);

        // Better error messages based on error type
        if (err instanceof ApiError) {
          setError(err);
        } else if (err instanceof Error) {
          setError(
            new ApiError(
              500,
              `Failed to fetch stock price for ${ticker}: ${err.message}`,
              "Internal Server Error"
            )
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPrice();
  }, [ticker, stockPriceService]);

  return { stockPrice, isLoading, error };
};
