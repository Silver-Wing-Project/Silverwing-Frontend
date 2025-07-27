import React from "react";
import styles from "../../../styles/reports/StockReportControls.module.css";

interface StockReportControlsProps {
    onFetchReports: () => void;
    isLoading: boolean;
}

export const StockReportControls: React.FC<StockReportControlsProps> = ({ onFetchReports, isLoading }) => {
    return (
        <div className={styles.controls}>
            <h1>Stock Report Table</h1>
            <button
                className={styles.fetchButton}
                onClick={onFetchReports}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Fetch Reports"}
            </button>
        </div>
    );
};