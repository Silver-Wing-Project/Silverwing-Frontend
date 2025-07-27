import styles from "./page.module.css";
import StockForm from "./components/StockForm";
import StockReportTable from "./components/StockReport/StockReportTable";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <StockForm /> */}
        <StockReportTable />
      </main>
    </div>
  );
}
