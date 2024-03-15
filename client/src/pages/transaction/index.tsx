import TransactionForm from "@/components/transactionForm";
import Transactions from "@/components/transactions";
import Layout from "@/components/layout";
import Info from "@/components/info";

import styles from "./Transaction.module.css";

const Transaction = () => {
  return (
    <Layout>
      <div className={styles.transactionContainer}>
        <div className={styles.topContainer}>
          <TransactionForm />
          <Info />
        </div>
        <Transactions />
      </div>
    </Layout>
  );
};

export default Transaction;
