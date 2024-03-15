import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "@/context/transactions";
import { Transaction } from "@/interface/Transaction";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import { red, green } from "@mui/material/colors";

import styles from "./Transaction.module.css";

const Transactions = () => {
  const { getTransactions, transactions } = useContext(TransactionsContext);
  const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>(
    []
  );

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    if (transactions) {
      const sorted = [...transactions].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setSortedTransactions(sorted.slice(0, 10));
    }
  }, [transactions]);

  const formatDate = (dateString: string) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatAmount = (amount: number | string) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className={styles.tableContainer}>
      <h1>Transactions History</h1>
      <Table>
        <TableHead>
          <TableRow className={styles.tableRow}>
            <TableCell className={styles.tableCell}></TableCell>
            <TableCell className={styles.tableCell}>
              Type of Transaction
            </TableCell>
            <TableCell className={styles.tableCell}>Amount</TableCell>
            <TableCell className={styles.tableCell}>CreatedAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.map((trans: Transaction) => (
            <TableRow key={trans._id}>
              <TableCell className={styles.tableCell}>
                {trans.transactionType === "deposit" ? (
                  <IconButton sx={{ color: green[500] }}>
                    <AttachMoney />
                  </IconButton>
                ) : (
                  <IconButton sx={{ color: red[500] }}>
                    <AttachMoney />
                  </IconButton>
                )}
              </TableCell>
              <TableCell className={styles.tableCell}>
                {trans.transactionType.toUpperCase()}
              </TableCell>
              <TableCell className={styles.tableCell}>
                {`$ ${formatAmount(trans.amount)}`}
              </TableCell>
              <TableCell className={styles.tableCell}>
                {formatDate(trans.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
