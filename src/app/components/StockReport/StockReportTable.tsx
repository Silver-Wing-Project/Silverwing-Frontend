"use client";

import React, { useState, useEffect } from "react";
import { useStockReports } from "@/hooks/useStockReports.hook";
import { flattenReportsForTable } from "@/utils/stock-report.utils";
import { StockReportControls } from "./StockReportControls";
import { StockReportError } from "./StockReportError";
import { StockReportTableView } from "./StockReportTableView";
import styles from "@/styles/reports/StockReportTable.module.css";

const StockReportTable = () => {
  // UI state
  const [isClient, setIsClient] = useState(false);
  const [ticker] = useState("AAPL");
  const [reportType] = useState("financials");

  // Business logic via custom hook
  const { stockReportsData, isLoading, error, fetchStockReports } =
    useStockReports();

  // Client-side rendering check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle fetch action
  const handleFetchReports = () => {
    fetchStockReports(ticker, reportType);
  };

  // Transform data for presentation
  const reportEntries = flattenReportsForTable(stockReportsData);

  if (!isClient) return null;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportContent}>
        <StockReportControls
          onFetchReports={handleFetchReports}
          isLoading={isLoading}
        />

        {error && <StockReportError error={error} />}

        {!error && !isLoading && (
          <StockReportTableView reportEntries={reportEntries} />
        )}
      </div>
    </div>
  );
};

export default StockReportTable;
