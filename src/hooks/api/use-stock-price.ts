import { useEffect, useMemo, useState } from "react";
import { StockPrice } from "@/api/types/StockPrice";
import { ApiError } from "@/api/config/api-error";
import { StockPriceService } from "@/api/services/StockPriceService";
import { TickerValidator } from "@/utils/ticker-validator";

export const useStockPrice = (ticker: string) => {
  const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const stockPriceService = useMemo(() => new StockPriceService(), []);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      try {
        TickerValidator.validate(ticker);
        const normalizedTicker = TickerValidator.normalize(ticker);

        setIsLoading(true);
        setError(null);

        const latestPrice =
          await stockPriceService.getMostRecentClosingPrice(normalizedTicker);

        if (latestPrice) {
          setStockPrice(latestPrice);
        } else {
          setError(
            new ApiError(
              404,
              `No recent stock data found for ${normalizedTicker}. Please verify the ticker symbol.`,
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
