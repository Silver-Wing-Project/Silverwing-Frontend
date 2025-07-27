import React from 'react';
import { ApiError } from '@/api/config/api-error';
import styles from "@/styles/reports/StockReportError.module.css";

interface StockReportErrorProps {
  error: ApiError;
}

export const StockReportError: React.FC<StockReportErrorProps> = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>Error: {error.message}</p>
      <p className={styles.errorStatusCode}>Status Code: {error.statusCode}</p>
    </div>
  );
};