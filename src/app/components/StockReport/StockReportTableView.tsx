import React from "react";
import { FlattenedReportEntry } from "@/utils/stock-report.utils";
import styles from "@/styles/reports/StockReportTableView.module.css";

interface StockReportTableViewProps {
  reportEntries: FlattenedReportEntry[];
}

export const StockReportTableView: React.FC<StockReportTableViewProps> = ({
  reportEntries,
}) => {
  if (reportEntries.length === 0) {
    return <div className={styles.noData}>No stock reports available</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.tickerColumn}`}>Ticker</th>
            <th className={`${styles.reportDateColumn}`}>Date</th>
            <th className={`${styles.reportTypeColumn}`}>Type</th>
            <th className={`${styles.financialDataColumn}`}>Financial Data</th>
          </tr>
        </thead>
        <tbody>
          {reportEntries.map((entry) => (
            <tr key={entry.id}>
              <td className={styles.tickerColumn}>{entry.ticker}</td>
              <td className={styles.reportDateColumn}>{entry.date}</td>
              <td className={styles.reportTypeColumn}>{entry.reportType}</td>
              <td className={styles.financialDataColumn}>
                <pre className={styles.jsonContent}>
                  {JSON.stringify(entry.financialData, null, 2)}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
