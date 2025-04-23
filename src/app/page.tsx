import styles from "./page.module.css";
import StockForm from "./components/StockForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <StockForm />
      </main>
    </div>
  );
}
