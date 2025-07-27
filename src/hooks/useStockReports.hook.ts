import { useState, useCallback } from "react";
import { StockReport } from "@/api/types/StockReport";
import { FinanceClient } from "@/api/clients/finance.client";
import { isSuccessResponse } from "@/types/clientResponse.type";
import { ApiError } from "@/api/config/api-error";

interface UseStockReportsReturn {
  stockReportsData: StockReport[];
  isLoading: boolean;
  error: ApiError | null;
  fetchStockReports: (ticker: string, reportType: string) => Promise<void>;
  clearData: () => void;
}

export const useStockReports = (): UseStockReportsReturn => {
  const [stockReportsData, setStockReportsData] = useState<StockReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchStockReports = useCallback(
    async (ticker: string, reportType: string) => {
      if (!ticker || !reportType) {
        setError(
          new ApiError(
            400,
            "Please provide ticker and report type",
            "Bad Request"
          )
        );
        setStockReportsData([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      setStockReportsData([]);

      try {
        const financeClient = new FinanceClient();
        const response = await financeClient.fetchStockReports(
          ticker,
          reportType
        );

        if (isSuccessResponse(response)) {
          console.log("Stock reports fetched successfully:", response.data);
          setStockReportsData(response.data);
        } else {
          let msg = response.message || "Failed to fetch stock reports";
          msg = msg.replace(
            /^(\(pythonService\))?\s*Python script error:\s*/i,
            ""
          );
          setError(new ApiError(response.statusCode, msg, response.error));
        }
      } catch (error) {
        console.error("Error fetching stock reports:", error);
        setError(
          new ApiError(
            500,
            "An unexpected error occurred while fetching stock reports.",
            "Internal Server Error"
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearData = useCallback(() => {
    setStockReportsData([]);
    setError(null);
  }, []);

  return {
    stockReportsData,
    isLoading,
    error,
    fetchStockReports,
    clearData,
  };
};
