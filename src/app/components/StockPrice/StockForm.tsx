"use client";

import { useState, useEffect } from "react";
import { StockPrice } from '@/api/types/StockPrice';
import { FinanceClient } from "@/api/clients/finance.client";
import { isSuccessResponse } from "@/types/clientResponse.type";
import styles from "../../styles/prices/StockForm.module.css";
import { ApiError } from "@/api/config/api-error";
import { formatDateToStringSlash } from "@/utils/date-parser.utils";

export default function StockForm() {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stockData, setStockData] = useState<StockPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Only set dates on client-side
    setStartDate(formatDateToStringSlash(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)));
    setEndDate(formatDateToStringSlash(new Date(Date.now() - 24 * 60 * 60 * 1000)));
  }, []);

  const handleClick = async () => {
    if (!ticker || !startDate || !endDate) {
      setError(new ApiError(400, "Please provide ticker, start date, and end date", "Bad Request"));
      setStockData([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setStockData([]);
    try {
      const financeClient = new FinanceClient();
      const response = await financeClient.fetchStockPrices(ticker, startDate, endDate);
      if (isSuccessResponse(response)) {
          setStockData(response.data);
      } else {
        // Remove technical prefix if present
        let msg = response.message || "Failed to fetch stock price";
        msg = msg.replace(/^(\(pythonService\))?\s*Python script error:\s*/i, "");
        setError(new ApiError(response.statusCode, msg, response.error));
      }
    } catch (error) {
      console.log("Error fetching stock prices:", error);
      console.log("Error details:", error);
      console.log("Error stack trace:", error);
      setError(new ApiError(500, "An unexpected error occurred", "Internal Server Error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputRow}>
        <label className={`${styles.boldLabel}`}>Stock Ticker: </label>
        <input
          className={styles.inputTicker}
          placeholder="AAPL"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
        />
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label}>Start Date: </label>
        <input
          className={styles.input}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={endDate || ""}
        />
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label}>End Date: </label>
        <input
          className={styles.input}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max=""
        />
      </div>

      <button 
        className={styles.input} 
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Stock Price'}
      </button>
    
      {error && (
        <div className={styles.error}>
          {error.message}
        </div>
      )}

      {!error && stockData.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>Close</th>
                <th>High</th>
                <th>Low</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((stock) => (
                <tr key={stock._id}>
                  <td>{formatDateToStringSlash(stock.date)}</td>
                  <td>{stock.open.toFixed(2)}</td>
                  <td>{stock.close.toFixed(2)}</td>
                  <td>{stock.high.toFixed(2)}</td>
                  <td>{stock.low.toFixed(2)}</td>
                  <td>{String(stock.volume)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}