import { useContext } from "react";
import styles from "./Loader.module.css";
import { TransactionsContext } from "@/context/transactions";

const Loader = () => {
  const { isLoading } = useContext(TransactionsContext);
  return (
    isLoading && (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  );
};

export default Loader;
