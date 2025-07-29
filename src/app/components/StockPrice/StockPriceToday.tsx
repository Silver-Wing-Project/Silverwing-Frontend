"use client";

import React from "react";
import { useStockPrice } from "@/hooks/api/use-stock-price";

interface StockPriceTodayProps {
  ticker: string;
}

const StockPriceToday: React.FC<StockPriceTodayProps> = ({ ticker }) => {
  const { stockPrice, isLoading, error } = useStockPrice(ticker);

  if (isLoading) return <div>Loading today&apos;s price....</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!stockPrice) return <div>No data available</div>;

  return (
    <div>
      <h3>
        {ticker} - Today&apos;s Price: ${stockPrice.close.toFixed(2)}
      </h3>
    </div>
  );
};

export default StockPriceToday;
