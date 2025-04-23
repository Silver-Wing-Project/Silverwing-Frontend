"use client";

import { useState, useEffect } from "react";
import styles from "../../app/page.module.css";

interface StockData {
  _id: string;
  ticker: string;
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  __v: number;
}

export default function StockForm() {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize dates after component mounts
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  const handleClick = async () => {
    if (!ticker || !startDate || !endDate) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3001/finance/fetch-stock-prices?ticker=${ticker}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'include'
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputRow}>
        <label className={`
          ${styles.boldLabel}
          `}>Stock Ticker: </label>
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
          max={endDate || new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label}>End Date: </label>
        <input
          className={styles.input}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
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
          {error}
        </div>
      )}

      {stockData.length > 0 && (
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
                  <td>{new Date(stock.date).toLocaleDateString()}</td>
                  <td>{stock.open.toFixed(2)}</td>
                  <td>{stock.close.toFixed(2)}</td>
                  <td>{stock.high.toFixed(2)}</td>
                  <td>{stock.low.toFixed(2)}</td>
                  <td>{stock.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 