import styles from "./page.module.css";
import StockReportTable from "@/app/components/StockReport/StockReportTable";
import StockPriceToday from "@/app/components/StockPrice/StockPriceToday";
import StockForm from "./components/StockPrice/StockForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <StockPriceToday ticker="NVDA" />
        {/* <StockForm /> */}
        <StockReportTable />
      </main>
    </div>
  );
}
